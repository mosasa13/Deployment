import Product from "../../models/product.js";
import Service from "../../models/service.js";
import User from "../../models/User.js";

const shop_get = async (req, res) => {
  const user = await User.findById(req.params.id);

  let myproducts = [];
  let myservices = [];

  res.render("servicesAndShop", {
    title: "Shop",
    user,
    myproducts,
    myservices,
    list: await Product.find(),
  });
};

export default { shop_get };
