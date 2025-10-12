import express from "express";
import Service from "../models/service";


const router = express.Router();

router.get("/", async (req, res) => {
   const allServices = await Service.find({});
   res.json(allServices);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service)
        return res.status(404).end();
    return res.json(service);
})

export default router;