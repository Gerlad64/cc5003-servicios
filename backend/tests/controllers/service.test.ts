
import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import {db, initial} from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import Service from "../../src/models/service";
import bcrypt from "bcrypt";

const api = supertest(app);
const base_url = "/api/services"

const login = async (user: { username: string; password: string }) => {
    const response = await api
        .post("/api/login")
        .send(user);
    const csrfToken = response.headers["x-csrf-token"];
    const setCookie = response.headers["set-cookie"];
    assert(Array.isArray(setCookie), "Set-Cookie header missing");
    const jwtValue = setCookie[0].match(/token=([^;]+)/)?.[1];
    return { csrfToken, token: jwtValue };
};


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
    beforeEach(async () => {
        const passwordHash = await bcrypt.hash("sekret", 10);
        const newUser = new User({
            username: "root",
            password: passwordHash,
            name: "Root",
            last_name: "Rumirez",
        });
        await newUser.save();
    });

    afterEach(async () => await api.post("/api/login/logout"));

    test("A valid service can be created", async () => {
        const initialServices = await db.services();
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
        const {csrfToken, token} = await login({username: "root", password: "sekret"});
        const result = await api
            .post(base_url)
            .set('Cookie', `token=${token}`)
            .set('X-CSRF-Token', csrfToken)
            .send(service)
            .expect(201);
        const finalServices = await db.services();
        assert.strictEqual(finalServices.length, initialServices.length + 1);
    })
})

after(async () => {
    await mongoose.connection.close();
});