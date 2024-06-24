import Product from "../../models/product.js";

const shop_get = async (req, res) => {
  res.render("./servicesAndShop.ejs", {
    title: "Shop",
    user: null,
    list : await Product.find(),
  });
};

export default { shop_get };
