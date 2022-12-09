const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cart")

/* GET users listing. */
router.post("/coupon", cartController.checkCoupon)
router.post("/check", cartController.checkQuantity)

module.exports = router
