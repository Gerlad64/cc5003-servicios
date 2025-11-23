import {Request, Response} from "express";
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
    const body = req.body;
    const user = await User.findById(req.userId);
    const service = await Service.findById(req.params.id);

    if ( !user )
        return res.status(400).json({ error: " user not found " });
    else if (! service )
        return res.status(400).json({ error: " service not found " });
    else if (! body.rating )
        return res.status(400).json({ error: "missing required field 'rating'" });
    const userFromService = await User.findById(service.user_id);
    if (!userFromService)
        return res.status(400).json({ error: " author of the service not found"})

    const review = {
        service_id: service._id,
        user_id: user.id,
        rating: body.rating,
        comment: body.comment,
    }
    const savedReview = await new Review(review).save();

    service.rating = await Review.aggregate<{ avg: number }>([
        {$match: {service_id: service._id}},
        {$group: {_id: null, avg: {$avg: "$rating"}}}
    ]).then(res => res[0]?.avg ?? null);
    await service.save();

    userFromService.rating = await Service.aggregate<{ avg: number }>([
        {$match: {_id: {$in: userFromService.services}}},
        {$group: {_id: null, avg: {$avg: "$rating"}}}
    ]).then(res => res[0]?.avg ?? null);
    await userFromService.save()

    return res.status(201).json(savedReview);
}

export default { getAll, getByServiceId, createOne };