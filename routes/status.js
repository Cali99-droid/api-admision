import express from "express";

import { store } from "../controllers/AgreeController.js";

const router = express.Router();

router.post("/", store);

export default router;
