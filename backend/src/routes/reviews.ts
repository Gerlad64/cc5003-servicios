import express from "express";
import reviews from "../controllers/review"

const router = express.Router();

router.get("/", reviews.getAll);
router.get("/:id", reviews.getByServiceId);
router.post("/:id", reviews.createOne);

export default router;
