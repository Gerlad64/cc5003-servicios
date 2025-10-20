import config from "../src/utils/config";
import mongoose from "mongoose";
import logger from "../src/utils/logger";
import {initial} from "./test_utils";

/* PARA CARGAR DATOS DE PRUEBA A LA BASE DE DATOS DE DESARROLLO O PRODUCCIÓN:
*       NODE_ENV=<development o production> npx tsx path/to/loadInitialData.ts
* */

console.log("LOADING INITIAL DATA")
if (config.MONGODB_URI) {
    mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME })
        .then(() => {
            console.log(`MongoDB Connected on ${config.MONGODB_URI} to ${config.MONGODB_DBNAME}`);
        })
        .catch( (error) => {
            logger.error("error connecting to MongoDB", error.message);
        });
}
else {
    console.log("No url provided for mongodb")
}

const load = async () => {
    await initial.loadUsers().then(() => console.log("Users initialized"));
    await initial.loadServices().then(() => console.log("Services initialized"));
}

load().then(() => console.log("FINISHED"))
