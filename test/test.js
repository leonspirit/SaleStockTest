var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://128.199.159.193:8081");

//GET /api/listUsers
describe("Get User Information", function(){

	it("should return 200", function(done){

		server.get('/api/listUsers').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 7 users", function(done){

		server.get('/api/listUsers').end(function(err, res){
			res.body.length.should.equal(7);
			done();
		})
	})

	it("should have id, username, email, and full name", function(done){

		server.get('/api/listUsers').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('user_id');
				res.body[i].should.have.property('username');
				res.body[i].should.have.property('email');
				res.body[i].should.have.property('full_name');
			}
			done();
		})
	})
})

//GET /api/listProducts
describe("Get Product Information", function(){

	it("should return 200", function(done){

		server.get('/api/listProducts').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 11 products", function(done){

		server.get('/api/listProducts').end(function(err, res){
			res.body.length.should.equal(11);
			done();
		})
	})

	it("should have id, name, description, price and stocks", function(done){

		server.get('/api/listProducts').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('product_id');
				res.body[i].should.have.property('p_name');
				res.body[i].should.have.property('p_description');
				res.body[i].should.have.property('price');
				res.body[i].should.have.property('stock');
			}
			done();
		})
	})
})

//GET /api/listCarts
describe("Get Cart Information", function(){

	it("should return 200", function(done){

		server.get('/api/listCarts').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 6 carts", function(done){

		server.get('/api/listCarts').end(function(err, res){
			res.body.length.should.equal(6);
			done();
		})
	})

	it("should have id, user_id, and order date", function(done){

		server.get('/api/listCarts').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('cart_id');
				res.body[i].should.have.property('user_id');
				res.body[i].should.have.property('order_date');
			}
			done();
		})
	})
})

//GET /api/listCoupons
describe("Get Coupon Information", function(){

	it("should return 200", function(done){

		server.get('/api/listCoupons').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 3 coupons", function(done){

		server.get('/api/listCoupons').end(function(err, res){
			res.body.length.should.equal(3);
			done();
		})
	})

	it("should have id, coupon code, discount, and expired date", function(done){

		server.get('/api/listCoupons').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('coupon_id');
				res.body[i].should.have.property('coupon_code');
				res.body[i].should.have.property('discount');
				res.body[i].should.have.property('expired');
			}
			done();
		})
	})
})

//GET /api/listOrders/{cart_id}
describe("Get Order Information", function(){

	it("should return 200", function(done){

		server.get('/api/listOrders/1').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return error when given negative number", function(done){

		server.get('/api/listOrders/-4').end(function(err, res){
			res.body.should.equal("Number must be non-negative");
			done();
		})
	})

	it("should have id, cart_id, product_id, and quantity", function(done){

		server.get('/api/listOrders/1').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('order_id');
				res.body[i].should.have.property('cart_id');
				res.body[i].should.have.property('product_id');
				res.body[i].should.have.property('quantity');
			}
		})

		server.get('/api/listOrders/2').end(function(err, res){

			for(i=0; i<res.body.length; i++){
				res.body[i].should.have.property('order_id');
				res.body[i].should.have.property('cart_id');
				res.body[i].should.have.property('product_id');
				res.body[i].should.have.property('quantity');
			}
		})
		done();
	})
})

//GET /api/countOrder/{cart_id}/{product_id}
describe("Get Products Order Information", function(){

	it("should return 200", function(done){

		server.get('/api/countOrder/1/1').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 400 when products unavailable", function(done){

		server.get('/api/countOrder/1/15').end(function(err, res){
			res.status.should.equal(400);
			done();
		})
	})

	it("should return error when given negative number", function(done){

		server.get('/api/countOrder/-1/1').end(function(err, res){
			res.body.should.equal("Number must be non-negative");
			done();
		})
	})

	it("should return a number", function(done){

		server.get('/api/countOrder/1/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})

		server.get('/api/countOrder/1/2').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})
		done();
	})
})

//GET /api/totalCart/{cart_id}/{coupon_code}?
describe("Get Total Purchase Amount", function(){

	it("should return 200", function(done){

		server.get('/api/totalCart/1').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return 400 when carts unavailable", function(done){

		server.get('/api/totalCart/100').end(function(err, res){
			res.status.should.equal(400);
			done();
		})
	})

	it("should return error when given negative number", function(done){

		server.get('/api/totalCart/-3').end(function(err, res){
			res.body.should.equal("Number must be non-negative");
			done();
		})
	})

	it("should return a number", function(done){

		server.get('/api/totalCart/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})

		server.get('/api/totalCart/1/AICKWL27ZX9EK1J').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})
		done();
	})
})

//POST /api/addOrder/{cart_id}/{product_id}/{count}
describe("Post Add Products to Cart", function(){

	it("should return 200", function(done){

		server.post('/api/addOrder/1/1/1').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return error when given negative number", function(done){

		server.post('/api/addOrder/-3/1/1').end(function(err, res){
			res.body.should.equal("Number must be non-negative");
			done();
		})
	})

	it("should return a number", function(done){

		server.post('/api/addOrder/1/1/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})

		server.post('/api/addOrder/2/2/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})
		done();
	})
})

//POST /api/removeOrder/{cart_id}/{product_id}/{count}
describe("Post Remove Products to Cart", function(){

	it("should return 200", function(done){

		server.post('/api/removeOrder/1/1/1').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("should return error when given negative number", function(done){

		server.post('/api/removeOrder/-3/1/1').end(function(err, res){
			res.body.should.equal("Number must be non-negative");
			done();
		})
	})

	it("should return error when cart doesnt contain the items", function(done){

		server.post('/api/removeOrder/10/1/1').end(function(err, res){
			res.body.should.equal("Invalid cart and products");
			done();
		})
	})

	it("should return error when cart doesnt contain as much items as in count parameter", function(done){

		server.post('/api/removeOrder/1/1/100').end(function(err, res){
			res.body.should.equal("Cart doesn't contain that much products");
			done();
		})
	})

	it("should return a number", function(done){

		server.post('/api/removeOrder/1/1/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})

		server.post('/api/removeOrder/2/2/1').end(function(err, res){

			var response = String(res.body);
			response.should.match(/[0-9]/);
		})
		done();
	})
})



