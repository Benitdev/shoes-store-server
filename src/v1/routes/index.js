const express = require("express")
const router = express.Router()

/* GET home page. */
router.use("/auth", require("./users"))
router.use("/products", require("./products"))
router.use("/cart", require("./cart"))

module.exports = router
