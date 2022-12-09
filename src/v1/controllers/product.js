const Product = require("../models/Product")

exports.getProducts = async (req, res) => {
  const { category, cate, gender, size, search } = req.query
  try {
    let criteria = []
    const cateRegex = new RegExp(`${cate || ""}`, "g")
    if (category && category != "products") criteria.push({ category })
    if (cate) criteria.push({ childrenCategory: cateRegex })
    if (gender && (category == "products" || category == "sales"))
      criteria.push({ category: gender })
    if (search) criteria.push({ name: new RegExp(`${search}`, "i") })

    let query = criteria.length > 0 ? { $and: criteria } : {}

    const products = await Product.find(query, "-reviews")
    res.status(200).json({ products })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getHomeProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find(
      { isFeatured: true },
      "-reviews"
    ).limit(6)
    const topRatedProducts = await Product.find({}, "-reviews")
      .sort({
        rating: -1,
      })
      .limit(6)
    const slideProducts = await Product.find(
      { isSlide: true },
      "-reviews"
    ).limit(6)

    res.status(200).json({ featuredProducts, topRatedProducts, slideProducts })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    if (product) res.status(200).json({ product })
    else res.status(404).json({ message: "product ID invalid" })
  } catch (err) {
    res.status(500).json(err)
  }
}
