import express from "express";
import mongoose from "mongoose";

import logger from "./utils/logger";
import config from "./utils/config";

import servicesRouter from "./controllers/service"
import usersRouter from "./controllers/user"

const app = express();

/* conectar mongodb */
if (config.MONGODB_URI) {
    mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME }).catch( (error) => {
        logger.error("error connecting to MongoDB", error.message);
    });
}

app.use(express.json());

app.use("/api/services", servicesRouter);
app.use("/api/users", usersRouter);

export default app;