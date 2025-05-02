import express from "express";
import cors from "cors";
import usersRouter from "./routers/users";
import mongoose from "mongoose";
import {config} from "./config";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);

const run = async () => {
    await mongoose.connect(config.db)

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
}

run().catch(console.error);