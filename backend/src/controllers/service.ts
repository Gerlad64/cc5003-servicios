import { Request, Response, NextFunction } from "express";
import Service from "../models/service";
import User from "../models/user";



/** Trae todos los servicios */
const getAll = async (req: Request, res: Response) => {
   const allServices = await Service.find({});
   res.json(allServices);
};

/** Trae un servicio por su id */
const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service)
        return res.status(404).end();
    return res.json(service);
};

/** Crea un servicio, el usurio debe estar autenticado */
const createOne = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await User.findById(req.userId);
    if ( !user )
        return res.status(400).json({ error: " user not found " });
    else if (! body.name )
        return res.status(400).json({ error: " titulo del servicio no encontrado " });

    const service = {
        user_id: user.id,
        name: body.name,
        category: body.category,
        is_delivery: body.is_delivery,
        delivery_scope: body.delivery_scope,
        on_location: body.on_location,
        location: body.location,
        schedule: body.schedule,
        description: body.description,
        pricing: body.pricing,
        contact: body.contact,
    }
    const savedService = await new Service(service).save();
    user.services.push(savedService.id);
    await user.save();
    return res.status(201).json(savedService);
}

export default { getAll, getById, createOne };