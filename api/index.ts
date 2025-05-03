import express from "express";
import cors from "cors";
import usersRouter from "./routers/users";
import categoriesRouter from "./routers/categories";
import mongoose from "mongoose";
import {config} from "./config";
import path from "node:path";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
app.use('/images', express.static(path.join(config.publicPath, 'images')));

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