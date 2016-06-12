var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8081");


describe("Get all information", function(){

	it("list users should return 200", function(done){

		server.get('/api/listUsers').end(function(err, res){
			res.status.should.equal(200);
			done();
		})
	})

	it("list users should return 7 elements", function(done){

		server.get('/api/listUsers').end(function(err, res){
			//var parse = JSON.parse(res.body);
			console.log(res.body)
			console.log(JSON.parse(res.body))
			done();
		})
	})
})