import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import { initial } from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import config from "../../src/utils/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const api = supertest(app);
const base_url = "/api/login"

const user = {
    username: "root",
    password: "sekret",
}

const login = async (user: { username: string; password: string }) => {
    return await api
        .post(base_url)
        .send(user);
};

describe("When there's initially some users in db", () => {
    beforeEach(async () => {
        await initial.loadUsers();
        const passwordHash = await bcrypt.hash("sekret", 10);
        const newUser = new User({
            username: "root",
            password: passwordHash,
            name: "Root",
            last_name: "Rumirez",
        });
        await newUser.save();
    });
    describe("When login succeeds with valid credentials", () => {
        test("Check username in response body", async () => {
            const result = await login(user);
            assert.strictEqual(result.status, 200);
            assert.match(result.headers["content-type"], /application\/json/);

            assert(result.body.username === user.username);
        });
        test("Check CSRF header", async () => {
            const result = await login(user);
            const csrfToken = result.headers["x-csrf-token"];
            assert(typeof csrfToken === "string", "Missing X-CSRF-Token header");
            assert(csrfToken.length > 10, "CSRF token too short");
        });

        test("Check JWT in cookie", async () => {
            const result = await login(user);
            const csrfToken = result.headers["x-csrf-token"];
            const setCookie = result.headers["set-cookie"];
            assert(Array.isArray(setCookie), "Set-Cookie header missing");
            const jwtValue = setCookie[0].match(/token=([^;]+)/)?.[1];
            assert(jwtValue, "JWT not found in cookie");
            const payload = jwt.verify(jwtValue, config.JWT_SECRET!);
            assert(payload && typeof payload === "object");
            assert.strictEqual(payload.username, user.username);
            assert.strictEqual(payload.csrf, csrfToken);
        });

        test("Loggout works successfully", async () => {
            await login(user);
            const result = await api.post(base_url+"/logout").expect(200)
            assert(result.body.message === "Logged out successfully");
        })
    });
    describe("When login fails with invalid credentials", () => {
        test("Check status code", async () => {
            const result = await login({
                username: "root",
                password: "wrongpassword",
            });
            assert.strictEqual(result.status, 401);
        });
    });

})

after(async () => {
    await mongoose.connection.close();
})