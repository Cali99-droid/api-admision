import express from "express";

import { authMiddleware } from "../middleware/session.js";
import { store } from "../controllers/AgreeController.js";
import { addImg, deleteImg } from "../controllers/IncomeController.js";

import { upload } from "../utils/handleUpload.js";

const router = express.Router();

router.delete("/delete-image", deleteImg);
router.post(
  "/add-image/:id",
  upload.array("images", 5),

  addImg
);

export default router;
