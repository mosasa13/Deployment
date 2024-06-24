import Services from "../../models/service.js";

const services_get = async (req, res) => {
  res.render("./servicesAndShop.ejs", {
    title: "Services",
    user: null,
    list: await Services.find(),
  });
};

export default { services_get };
