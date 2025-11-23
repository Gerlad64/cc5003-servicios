import express from "express";
import reviews from "../controllers/review"
import {authenticate} from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", reviews.getAll);
router.get("/service/:id", reviews.getByServiceId);
router.post("/:id", authenticate, reviews.createOne);

export default router;
