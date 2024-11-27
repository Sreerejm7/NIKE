const express = require('express')
const verifyToken = require('../Middleware/Middleware.js')

const route = express.Router()
const {CreateProduct,GetAllProducts, UpdateProducts, DeleteProduct, GetProductById, CreateUser, LoginUser, AddtoCart, FetchCart, UpdateFromCart, DeleteFromCart, AddtoFavourite, FetchFavourite, DeleteFromFavourite, MakeNewAdmin, CreateOrder, fetchorder, createpayment, paymentverification, ClearCart, UpdateOrder, fetchOrderbyUser, DeleteOrder} = require('../controllers/controller.js')


route.post('/create',verifyToken,CreateProduct)
route.get('/getallproducts',GetAllProducts)
route.put('/updateproducts/:id',verifyToken,UpdateProducts)
route.delete('/deleteproduct/:id',verifyToken,DeleteProduct)
route.get('/getproduct/:id',GetProductById)
route.post('/createuser',CreateUser)
route.post('/loginuser',LoginUser)
route.post('/addtocart/:id',verifyToken,AddtoCart)
route.get('/fetchcart',verifyToken,FetchCart)
route.put('/updatecart/:id',verifyToken,UpdateFromCart)
route.delete('/deletecart/:id',verifyToken,DeleteFromCart)
route.post('/addtofavourite/:id',verifyToken,AddtoFavourite)
route.get('/fetchfavourite',verifyToken,FetchFavourite)
route.delete('/deletefavourite/:id',verifyToken,DeleteFromFavourite)
route.post('/makeAdmin',verifyToken,MakeNewAdmin)
route.post('/product/order',verifyToken,CreateOrder)
route.get('/product/fetch',verifyToken,fetchorder)
route.delete('/clearcart',verifyToken,ClearCart)
route.put('/order/update/:id/product/:productId', verifyToken, UpdateOrder);
route.get('/order/fetchbyuser', verifyToken, fetchOrderbyUser);
route.delete('/order/delete/:id/product/:productId',verifyToken,DeleteOrder)

exports.route = route