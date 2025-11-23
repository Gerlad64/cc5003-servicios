import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import supertest from "supertest";
import {authRequest, db, IAuthRequest, initial } from "../test_utils";
import bcrypt from "bcrypt";
import User from "../../src/models/user";
import Review from "../../src/models/review";
import Service from "../../src/models/service";
import mongoose from "mongoose";


const api = supertest(app);
const base_url = '/api/reviews';


describe("when there is initially some services and users in the db", () => {

    let userId: string;
    let userId2: string;
    let authApi: IAuthRequest;
    let service_id: mongoose.Types.ObjectId;
    beforeEach(async () => {
        await Review.deleteMany({});
        await initial.loadUsers();
        await initial.loadServices();
        const passwordHash = await bcrypt.hash("sekret", 10);
        const passwordHash2 = await bcrypt.hash("sekret2", 10);
        const newUser = new User({
            username: "root",
            password: passwordHash,
            name: "Root",
            last_name: "Ramirez",
        });
        const newUser2 = new User({
           username: "root_brother",
           password: passwordHash2,
           name: "Broot",
           last_name: "Ramirez",
        });
        await Promise.all([newUser.save(), newUser2.save()]);
        userId = newUser.id;
        userId2 = newUser2.id;
        authApi = await authRequest(api, {username: "root", password: "sekret"});
        service_id = (await Service.findOne({name: "Paseo de perros"}))!._id;
    });
    afterEach(async () => await api.post("/api/login/logout"));

    test("A review can be created with comment and rating", async () => {
        const initialReviews = await Review.find( {service_id: service_id});

        const reviewData = {
            user_id: userId,
            service_id: service_id,
            rating: 2.0,
            comment: "A mi perro no le gusto",
        };

        const result = await authApi
            .post(base_url+`/${service_id.toString()}`)
            .send(reviewData)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const finalReviews = await Review.find( {service_id: service_id});
        const updatedService = await Service.findById(service_id);
        assert.strictEqual(finalReviews.length, initialReviews.length + 1);
        assert.equal(updatedService!.rating, 2.0);
    });
    test("When two reviews are added, the resulting rating is the average of both ratings.", async () => {
        const initialReviews = await Review.find({service_id: service_id});
        const initialService = await Service.findById(service_id);
        assert.equal(initialService!.rating, 0.0);
        /** crenado reviews */
        const reviewData1 = {
            user_id: userId,
            service_id: service_id,
            rating: 2.0,
            comment: "A mi perro no le gusto",
        };
        const reviewData2 = {
            user_id: userId2,
            service_id: service_id,
            rating: 5.0,
            comment: "¡¡A mi perro le encantó!!"
        };

        /** Mandando las Reviews */
        await authApi
            .post(base_url+`/${service_id.toString()}`)
            .send(reviewData1)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        await api.post("/api/login/logout");
        authApi = await authRequest(api, {username: "root_brother", password: "sekret2"});
        await authApi
            .post(base_url+`/${service_id.toString()}`)
            .send(reviewData2)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const finalReviews = await Review.find( {service_id: service_id});
        const updatedService = await Service.findById(service_id);
        assert.strictEqual(finalReviews.length, initialReviews.length + 2);
        assert.equal(updatedService!.rating, 3.5);
    });
});

after(async () => {
    await mongoose.connection.close();
});