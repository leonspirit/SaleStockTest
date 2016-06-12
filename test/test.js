var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8081");

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



