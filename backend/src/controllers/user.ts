import express from "express";
import User from "../models/user";

const router = express.Router();


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
})

export default router;