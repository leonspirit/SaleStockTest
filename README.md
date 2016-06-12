# SaleStock Case Study No 2

Server deployed on http://128.199.159.193:8081  
Database is using PostgreSQL (available to import from salestock.pgsql)

Testing using mocha framework,  
(npm install -g mocha) and then run (mocha) on project root 

## Available API

##### Get User Information  
GET /api/listUsers

##### Get Product Information  
GET /api/listProducts

##### Get Cart Information  
GET /api/listCarts

##### Get Coupon Information  
GET /api/listCoupons

##### Get Order Information  
GET /api/listOrders/{cart_id}

##### Get Products Order Information  
GET /api/countOrder/{cart_id}/{product_id}

##### Get Total Purchase Amount  
GET /api/totalCart/{cart_id}/{coupon_code}(optional)

##### Post Add Products to Cart  
POST /api/addOrder/{cart_id}/{product_id}/{count}

##### Post Remove Products from Cart  
POST /api/removeOrder/{cart_id}/{product_id}/{count}
