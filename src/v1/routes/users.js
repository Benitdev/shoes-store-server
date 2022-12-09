const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

/* GET users listing. */
router.get("/", userController.getUsers)
router.post("/register", userController.register)

module.exports = router
