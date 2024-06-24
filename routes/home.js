import express from "express";
const router = express.Router();

import shop from "../controllers/home/shop.js";
import services from "../controllers/home/services.js";

router.get("/shop", shop.shop_get);
router.get("/services", services.services_get);

export default router;
