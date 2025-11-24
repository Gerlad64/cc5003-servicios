import app from "../../src/app"
import {test, after, beforeEach, describe, afterEach} from "node:test"
import assert from "node:assert";
import {authRequest, db, IAuthRequest, initial} from '../test_utils';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../../src/models/user";
import Service from "../../src/models/service";
import bcrypt from "bcrypt";
import path from 'path';
import fs from 'fs';

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

        const usersInDb = await db.users();
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

        const usersInDb = await db.users();
        assert(result.body.error.includes("El nombre de usuario ya está en uso"));
        assert.strictEqual(usersInDb.length, initial.USERS.length);
        })


});

describe("When there is one authenticated user", () => {
    const TEST_IMAGE_PATH = path.resolve(__dirname, 'dummy.jpg');
    const TEST_BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
    const UPLOADS_DIR = path.resolve(__dirname, '../../profile_pics');
    let userId: mongoose.Types.ObjectId;
    let authApi: IAuthRequest;
    let uploadedFilePath: string | null = null;
    beforeEach(async () => {
        await User.deleteMany({});
        await Service.deleteMany({});
        const passwordHash = await bcrypt.hash("sekret", 10);
        const newUser = new User({
            username: "dummy",
            password: passwordHash,
            name: "Dummy",
            last_name: "Foo",
        });
        await newUser.save()
        userId = newUser._id;
        authApi = await authRequest(api, {username: "dummy", password: "sekret"});
        // crea una imagen falsa
        fs.writeFileSync(TEST_IMAGE_PATH, 'fake image content');
    });
    afterEach(async () => {
        if (fs.existsSync(TEST_IMAGE_PATH)) {
            fs.unlinkSync(TEST_IMAGE_PATH);
        }

        if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
            fs.unlinkSync(uploadedFilePath);
        }
    })
    test("A user can update their profile pic", async () => {
        const response = await authApi
            .put(base_url+`/${userId.toString()}/profile`)
            .attach('profile',TEST_IMAGE_PATH)
            .expect(200);

        /** Respuesta http es correcta */
        assert.strictEqual(response.body.message, 'Foto actualizada');
        assert.ok(response.body.url.startsWith(TEST_BASE_URL),
            `La URL debería empezar con ${TEST_BASE_URL}`);

        assert.match(response.body.url, /\/profile_pics\//);

        /** Los datos se actualizaron en la base de datos*/
        const updatedUser = await User.findById(userId);
        assert.strictEqual(updatedUser?.profile_pic_url, response.body.url);

        /** El archivo físico existe */
        // elimina el primer '/', de modo que la quede profile_pics/dummy.jpg
        const filename = path.basename(response.body.url);
        // ruta completa
        const fullPathOnDisk = path.join(UPLOADS_DIR, filename);
        // path del archivo para eliminarlo despues del test
        uploadedFilePath = fullPathOnDisk;
        assert.ok(fs.existsSync(fullPathOnDisk), `El archivo debería existir en: ${fullPathOnDisk}`);
    })
});

after(async () => {
    await mongoose.connection.close();
});