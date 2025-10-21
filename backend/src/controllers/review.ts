import { Request, Response, NextFunction } from "express";
import Service from "../models/service";
import User from "../models/user";
import Review from "../models/review";


const getAll = async (req: Request, res: Response) => {
    const allReviews = await Review.find({});
    res.json(allReviews);
}

const getByServiceId = async (req: Request, res: Response) => {
    const service_id = req.params.id;
    const review = await Review.find({service_id: service_id});
    if (!review)
        return res.status(404).end();
    return res.json(review);
}

const createOne = async (req: Request, res: Response) => {

}

export default { getAll, getByServiceId, createOne };