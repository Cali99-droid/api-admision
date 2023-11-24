import express from "express";

import { authMiddleware } from "../middleware/session.js";
import { store } from "../controllers/AgreeController.js";
import { addImg, deleteImg } from "../controllers/IncomeController.js";

import { upload } from "../utils/handleUpload.js";

const router = express.Router();

router.post("/delete-image", authMiddleware, deleteImg);
router.post(
  "/add-image/:id",
  upload.array("images", 5),
  authMiddleware,
  addImg
);

export default router;
