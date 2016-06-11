var express = require('express');
var app = express()
var fs = require("fs");
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/SaleStock';

function server_error(err, res){
	console.log(err);
	return res.status(500).send("Server Temporarily Unavailable");
}

//check quantity of given product on a given cart
function checkQuantity(cart_id, product_id, client, res){
	var quantity = 0;
	var countString = "SELECT quantity FROM orders WHERE cart_id=($1) AND product_id=($2)";
	var countQuantity = client.query(countString, [cart_id, product_id]);

	countQuantity.on('row', function(record){
		quantity = record.quantity;
	})
	countQuantity.on('end', function(){
		return res.json(quantity);
	})
}

//GET all users
app.get('/api/listUsers', function (req, res) {
   
	var results = []
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}   	

		var queryString = "SELECT * from users";
		var query = client.query(queryString);

		
		query.on('row', function(record){
			results.push(record);
		})

		query.on('end', function(){
			done();
			return res.json(results);
		})
	})
})

//POST add items to cart
app.post('/api/addOrder/:cart_id/:product_id/:count', function(req, res){

	var cart_id = req.params.cart_id;
	var product_id = req.params.product_id;
	var count = req.params.count;

	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}

		var queryString = "SELECT order_id FROM orders WHERE cart_id=($1) AND product_id=($2)";
		var query = client.query(queryString, [cart_id, product_id]);
		var orderString;

		query.on('end', function(results){
			addOrder(results.rowCount);
		})

		function addOrder(rowCount){
			if(rowCount > 0){
				orderString = "UPDATE orders SET quantity=quantity+($1) WHERE cart_id=($2) AND product_id=($3)";
				client.query(orderString, [count, cart_id, product_id]);
			}
			else{
				orderString = "INSERT INTO orders(cart_id,product_id,quantity) VALUES(($1), ($2), ($3))"
				client.query(orderString, [cart_id, product_id, count]);
			}
			done();
			checkQuantity(cart_id, product_id, client, res);
		}
	})
})

//POST remove items from cart
app.post('/api/removeOrder/:cart_id/:product_id/:count', function(req, res){

	var cart_id = req.params.cart_id;
	var product_id = req.params.product_id;
	var count = req.params.count;

	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}

		var quantityString = "SELECT quantity FROM orders WHERE cart_id=($1) and product_id=($2)";
		var quantityQuery = client.query(quantityString, [cart_id, product_id]);

		var quantity = 0;
		quantityQuery.on('row', function(record){
			quantity = record.quantity;
		})
		quantityQuery.on('end', function(result){
			if(result.rowCount == 0){
				done();
				return res.send("Cart doesn't contain the items");
			}
			if(quantity < count){
				done();
				return res.send("Cart doesn't contain that much items");
			}

			var queryString = "UPDATE orders SET quantity=quantity-($1) WHERE cart_id=($2) AND product_id=($3)";
			var query = client.query(queryString, [count, cart_id, product_id]);

			query.on('end', function(){
				done();
				checkQuantity(cart_id, product_id, client, res);
			})
		})
	})
})

//GET total purchase amount of given cart_id
app.get('/api/totalCart/:cart_id', function(req, res){

	var cart_id = req.params.cart_id;

	pg.connect(connectionString, function(err, client, done){
		
		if(err){
			done();
			server_error(err, res);
		}

		var queryString = "SELECT product_id, quantity FROM orders WHERE cart_id=($1)";
		var query = client.query(queryString, [cart_id]);

		var totalPrice = 0;
		var totalCount = -1;
		var nowCount = 0;
		query.on('row', function(record, result){
			var priceString = "SELECT price FROM products WHERE product_id=($1)";
			var price = client.query(priceString, [record.product_id]);

			price.on('row', function(row){
				totalPrice = totalPrice + (row.price*record.quantity);
			})
			price.on('end', function(){
				nowCount = nowCount + 1;
				if(nowCount == totalCount){
					done();
					return res.json(totalPrice);
				}
			})
		})

		query.on('end', function(result){
			totalCount = result.rowCount;
			if(totalCount == 0){
				done();
				return res.json(totalPrice);	
			}
			if(nowCount == totalCount){
				done();
				return res.json(totalPrice);
			}
		})
	})
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})