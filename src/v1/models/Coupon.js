const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    // 0 amount, 1 percent
    type: { type: Number, required: true, default: 0 },
    value: { type: Number },
    expires: { type: Date },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Coupon", couponSchema)
