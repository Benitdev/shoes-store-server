const User = require("../models/User")
const jsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body
  try {
    const newUser = new User({
      name: firstName + " " + lastName,
      email,
      image: null,
      phoneNumber,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    const token = jsonWebToken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    )
    res.status(200).send({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (err) {
    res.status(500).json(err)
  }
}
