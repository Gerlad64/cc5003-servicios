import express from "express";
import auth from "../controllers/auth";


const router = express.Router()

router.get('/', auth.login);

router.post('/logout', auth.logout);

router.get("/me", auth.me);

export default router;