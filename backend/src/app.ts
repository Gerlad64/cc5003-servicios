import express from "express";

import servicesRouter from "./controllers/service"
import usersRouter from "./controllers/user"

const app = express();


app.use(express.json());

app.use("/api/services", servicesRouter);
app.use("/api/users", usersRouter);

export default app;