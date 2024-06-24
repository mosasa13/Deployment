import Service from "../../models/service.js";
import Product from "../../models/product.js";
import User from "../../models/User.js";

const services_get = async (req, res) => {
  const user = await User.findById(req.params.id);

  let myproducts = [];
  let myservices = [];

  res.render("servicesAndShop", {
    title: "Services",
    user,
    myproducts,
    myservices,
    list: await Service.find(),
  });
};

export default { services_get };
