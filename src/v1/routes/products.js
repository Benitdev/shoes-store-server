const express = require("express")
const router = express.Router()
const productController = require("../controllers/product")

/* GET users listing. */
router.get("/", productController.getProducts)
router.get("/home", productController.getHomeProducts)
router.get("/:slug", productController.getProductBySlug)

module.exports = router
