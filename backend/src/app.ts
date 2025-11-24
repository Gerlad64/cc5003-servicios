/* Dependencias */
import express from "express";
import mongoose from "mongoose";
/* utils */
import logger from "./utils/logger";
import config from "./utils/config";
/* routes */
import servicesRouter from './routes/services'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import reviewsRouter from './routes/reviews'
import testingRouter from './routes/testing'
/* middlewares */
import errorMiddleware from "./middlewares/errorMiddleware";
import cookieParser from "cookie-parser";

import cors from 'cors';
import path from 'path';

const app = express();

/* conectar mongodb */
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

app.use(express.json());
app.use(cookieParser());
app.use('/profile_pics', express.static(path.join(__dirname, '../profile_pics')));
// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['http://fullstack.dcc.uchile.cl:7104', 'http://fullstack.dcc.uchile.cl']
        : 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

// API routes
app.use("/api/services", servicesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", authRouter)
app.use("/api/reviews", reviewsRouter);
app.use("/api/testing", testingRouter);

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });
}

app.use(errorMiddleware.unknownEndpoint);
app.use(errorMiddleware.errorHandler);

export default app;