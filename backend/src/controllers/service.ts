import { Request, Response, NextFunction } from "express";
import Service from "../models/service";



const getAll = async (req: Request, res: Response) => {
   const allServices = await Service.find({});
   res.json(allServices);
};

const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service)
        return res.status(404).end();
    return res.json(service);
};

export default { getAll, getById };