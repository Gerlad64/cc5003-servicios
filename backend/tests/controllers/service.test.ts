
import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import initial from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import Service from "../../src/models/service";

const api = supertest(app);
const base_url = "/api/services"

describe("When there is initially some services", () => {
    beforeEach(async () => {
       await initial.load();

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
after(async () => {
    await mongoose.connection.close();
});