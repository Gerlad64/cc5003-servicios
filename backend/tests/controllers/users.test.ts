import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import initial from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";

const api = supertest(app);
const base_url = "/api/users"

describe("When there is initially some users", () => {
    beforeEach(async () => {
        await initial.loadUsers();

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

    test("A user can be created", async () => {
        const newUser = {
            username: "test",
            password: "test1234",
            name: "Tomás",
            last_name: "Estero"
        }
        await api
            .post(base_url)
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const users = await User.find({})
        const usersInDb = users.map( u => u.toJSON());
        assert.strictEqual(usersInDb.length, initial.USERS.length + 1);
    })
    test("Creation fails with proper statuscode and message if username already taken",
        async () => {
        const newUser = {
            username: "jperez",
            password: "test1234",
            name: "José",
            last_name: "Perez"
        }
        const result = await api
            .post(base_url)
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        const users = await User.find({});
        const usersInDb = users.map( u => u.toJSON());
        assert(result.body.error.includes("expected `username` to be unique"));
        assert.strictEqual(usersInDb.length, initial.USERS.length);
        })



});
after(async () => {
    await mongoose.connection.close();
});