
import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import {db, initial, authRequest, IAuthRequest} from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import Service from "../../src/models/service";
import bcrypt from "bcrypt";

const api = supertest(app);
const base_url = "/api/services"


describe("When there is initially some services", () => {
    beforeEach(async () => {
       await initial.loadUsers();
       await initial.loadServices();

    });
    afterEach(async () => {
    })


    test("services are returned as json", async () => {
        const response = await api
            .get(base_url)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("All services are returned", async () => {
        const response = await api.get(base_url);
        assert.strictEqual(response.body.length, initial.SERVICES.length);
    })



});

describe("When there is initially one user logged in", () => {
    let authApi: IAuthRequest;
    beforeEach(async () => {
        await User.deleteMany({});
        await Service.deleteMany({});
        const passwordHash = await bcrypt.hash("sekret", 10);
        const newUser = new User({
            username: "root",
            password: passwordHash,
            name: "Root",
            last_name: "Rumirez",
        });
        await newUser.save();
        authApi = await authRequest(api, {username: "root", password: "sekret"});
    });

    afterEach(async () => await api.post("/api/login/logout"));

    test("A valid service can be created properly", async () => {
        const initialServices = await db.services();
        const userInitialServices = (await User.findOne({username: "root"}))!.services;
        const service = {
            name: "Clases particulares MATES",
            is_delivery: true,
            delivery_scope: ["Estación Central", "Santiago"],
            on_location: true,
            location: "Santiago",
            schedule: "de lunes a viernes de 10:00AM a 21:00PM",
            description: " Ofrezco clases particulares de matemática todos los niveles",
            pricing: "10lkas la hora",
            contact: {whatsapp: "+56912345678"}
        };
        const result = await authApi
            .post(base_url)
            .send(service)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const finalServices = await db.services();
        const userFinalServices = (await User.findOne({username: "root"}))!.services;
        assert.strictEqual(finalServices.length, initialServices.length + 1);
        assert.strictEqual(userFinalServices.length, userInitialServices.length + 1);
        assert.strictEqual(userFinalServices.pop()!.toString(), result.body.id);
    })
})

after(async () => {
    await mongoose.connection.close();
});