const Coupon = require("../models/Coupon")
const Product = require("../models/Product")

exports.checkCoupon = async (req, res) => {
  try {
    const { code } = req.body
    const coupon = await Coupon.findOne({ code }).lean()
    if (coupon) res.status(200).json(coupon)
    else res.status(404).send({ message: "Code is not valid" })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.checkQuantity = async (req, res) => {
  try {
    const { _id, size, quantity } = req.body
    console.log({ _id, size, quantity })
    const product = await Product.findById(_id)
    const existProductSize = product.countInStock.find(
      (item) => item.size == size
    )
    if (existProductSize.count >= quantity)
      res.status(200).json({ message: "Ok" })
    else res.status(400).json({ message: "Out of stock" })
  } catch (err) {
    res.status(500).json(err)
  }
}
