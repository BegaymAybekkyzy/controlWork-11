import express from "express";
import {Error} from "mongoose";
import Item from "../models/Item";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {imagesUpload} from "../middleware/multer";

const itemsRouter = express.Router();

itemsRouter.post("/",authentication, imagesUpload.single("image"), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {category, title, description, price} = req.body;

        const newItem = new Item({
            user: user._id,
            category,
            title,
            description,
            image: "images/" + req.file?.filename,
            price,
        });

        await newItem.save();
        res.send(newItem);

    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

itemsRouter.get("/", async (req, res, next) => {
    try {

    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default itemsRouter;