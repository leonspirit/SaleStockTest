var express = require('express');
var app = express()
var fs = require("fs");
var pg = require('pg');


var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/SaleStock';

//internal server error
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
		return res.status(200).json(quantity);
	})
}

function negativeNumber(res){
	return res.status(400).send("Number must be non-negative");
}

//GET all users
app.get('/api/listUsers', function (req, res) {
   
	var results = []
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}   	

		var queryString = "SELECT * FROM users";
		var query = client.query(queryString);

		
		query.on('row', function(record){
			results.push(record);
		})

		query.on('end', function(){
			done();
			res.contentType('application/json');
			return res.status(200).send(JSON.stringify(results));
		})
	})
})

//GET all products
app.get('/api/listProducts', function(req, res){

	var results = []
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}

		var queryString = "SELECT * FROM products";
		var query = client.query(queryString);

		query.on('row', function(record){
			results.push(record);
		})

		query.on('end', function(){
			done();
			res.contentType('application/json');
			return res.status(200).send(JSON.stringify(results));
		})
	})
})

//GET all carts information
app.get('/api/listCarts', function(req, res){

	var results = []
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}

		var queryString = "SELECT * FROM carts";
		var query = client.query(queryString);

		query.on('row', function(record){
			results.push(record);
		})

		query.on('end', function(){
			done();
			res.contentType('application/json');
			return res.status(200).send(JSON.stringify(results));
		})
	})
})

//GET all coupons information
app.get('/api/listCoupons', function(req, res){

	var results = []
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			server_error(err, res);
		}

		var queryString = "SELECT * FROM coupon";
		var query = client.query(queryString);

		query.on('row', function(record){
			results.push(record);
		})

		query.on('end', function(){
			done();
			res.contentType('application/json');
			return res.status(200).send(JSON.stringify(results));
		})
	})
})

//GET all orders from a cart
app.get('/api/listOrders/:cart_id', function(req, res){

	var cart_id = req.params.cart_id;
	var results = []

	if(cart_id < 0){
		negativeNumber(res);
	}
	else{
		pg.connect(connectionString, function(err, client, done){

			if(err){
				done();
				server_error(err, res);
			}

			var queryString = "SELECT * FROM orders WHERE cart_id=($1)";
			var query = client.query(queryString, [cart_id]);

			query.on('row', function(record){
				results.push(record);
			})

			query.on('end', function(result){
				done();
				res.contentType('application/json');
				return res.status(200).send(JSON.stringify(results));
			})
		})
	}
})

//POST add items to cart
app.post('/api/addOrder/:cart_id/:product_id/:count', function(req, res){

	var cart_id = req.params.cart_id;
	var product_id = req.params.product_id;
	var count = req.params.count;

	if(cart_id < 0 || product_id < 0 || count < 0){
		negativeNumber(res);
	}
	else{

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
	}
})

//POST remove items from cart
app.post('/api/removeOrder/:cart_id/:product_id/:count', function(req, res){

	var cart_id = req.params.cart_id;
	var product_id = req.params.product_id;
	var count = req.params.count;

	if(cart_id < 0 || product_id < 0 || count < 0){
		negativeNumber(res);
	}
	else{

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
					return res.status(400).send("Invalid cart and products");
				}
				if(quantity < count){
					done();
					return res.status(400).send("Cart doesn't contain that much products");
				}

				var queryString = "UPDATE orders SET quantity=quantity-($1) WHERE cart_id=($2) AND product_id=($3)";
				var query = client.query(queryString, [count, cart_id, product_id]);

				query.on('end', function(){
					done();
					checkQuantity(cart_id, product_id, client, res);
				})
			})
		})
	}
})

//GET total purchase amount of given cart_id
app.get('/api/totalCart/:cart_id/:coupon_id?', function(req, res){

	var cart_id = req.params.cart_id;
	var coupon_id = req.params.coupon_id;

	if(cart_id < 0){
		negativeNumber(res);
	}
	else{

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
						checkCoupon();
						//return res.status(200).json(totalPrice);
					}
				})
			})

			query.on('end', function(result){
				totalCount = result.rowCount;
				if(totalCount == 0){
					done();
					return res.status(400).json(totalPrice);	
				}
				if(nowCount == totalCount){
					checkCoupon();
				}
			})

			function checkCoupon(){
				if(coupon_id == undefined){
					done();
					return res.status(200).json(totalPrice);
				}
				else{
					var couponString = "SELECT discount, expired FROM coupon WHERE coupon_code=($1)";
					var coupon = client.query(couponString, [coupon_id]);

					var discount = 0;
					var exp;
					coupon.on('row', function(record){
						discount = record.discount;
						exp = record.expired;
					})
					coupon.on('end', function(results){
						
						if(results.rowCount == 0){
							done();
							return res.status(400).send("Invalid Coupon Code");
						}
						else{
							var currTimestamp = new Date();
							var expiredDate = new Date(exp);

							if(currTimestamp < expiredDate){
								totalPrice = totalPrice - (discount*totalPrice/100);
								done();
								return res.status(200).json(totalPrice);
							}
							else{
								done();
								return res.status(400).send("Coupon Expired");
							}
						}
					})
				}
			}
		})
	}
})

//GET item quantity of given cart_id and product_id
app.get('/api/countOrder/:cart_id/:product_id', function(req, res){

	var cart_id = req.params.cart_id;
	var product_id = req.params.product_id;

	if(cart_id < 0 || product_id < 0){
		negativeNumber(res);
	}
	else{
		pg.connect(connectionString, function(err, client, done){

			if(err){
				done();
				server_error(err, res);
			}

			var queryString = "SELECT quantity FROM orders WHERE cart_id=($1) AND product_id=($2)";
			var query = client.query(queryString, [cart_id, product_id]);

			var quantity = 0;
			query.on('row', function(record){
				quantity = record.quantity;
			})
			query.on('end', function(result){
				if(result.rowCount == 0){
					res.status(400).json(quantity);
				}
				else{
					res.status(200).json(quantity);
				}
			})
		})
	}
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})