import express from "express";
import auth from "../controllers/auth";
import { withUser } from "../middlewares/userMiddleware";


const router = express.Router()

router.post('/', auth.login);

router.post('/logout', auth.logout);

router.get("/me", withUser, auth.me);

export default router;