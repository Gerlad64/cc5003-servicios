/* Dependencias */
import express from "express";
import mongoose from "mongoose";
/* utils */
import logger from "./utils/logger";
import config from "./utils/config";
/* controller */
import servicesRouter from "./controllers/service"
import usersRouter from "./controllers/user"
/* middlewares */
import errorMiddleware from "./middlewares/errorMiddleware";

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

app.use(errorMiddleware.unknownEndpoint);
app.use(errorMiddleware.errorHandler);

export default app;