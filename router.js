const express = require('express');
const router = express.Router()
const storeCtrl = require("./controller/storeController");
const errorHandler = require('./middleware/errorhandler');
const reqDate = require('./middleware/date')


router.use(reqDate.date)
router
.get("/carts", storeCtrl.getCarts)
.get("/carts/bigcarts", storeCtrl.getBigCarts)
.get("/users", storeCtrl.getUsers)
.get("/users/firsts", storeCtrl.getFirstThreeUsers)
.get("/products", storeCtrl.getAllProducts)
.get( "/products/categories", storeCtrl.getCategories)
.get("/products/:id", storeCtrl.getProductById)
.get("/products/categories/expensive", storeCtrl.getCategoryMostExpensive)

router.use(errorHandler.serviceNotFound)


  module.exports = router;