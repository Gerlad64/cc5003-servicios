import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import initial from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import Service from "../../src/models/service";

const api = supertest(app);
const base_url = "/api/users"

describe("When there is initially some users", () => {
    beforeEach(async () => {
        await initial.load();

    });
    afterEach(async () => {
    })


    test("users are returned as json", async () => {
        await api
            .get(base_url)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("All users are returned", async () => {
        const response = await api.get(base_url);
        assert.strictEqual(response.body.length, initial.USERS.length);
    })





});
after(async () => {
    await mongoose.connection.close();
});