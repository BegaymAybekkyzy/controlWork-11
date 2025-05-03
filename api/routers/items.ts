import express from "express";
import {Error} from "mongoose";
import Item from "../models/Item";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {imagesUpload} from "../middleware/multer";
import Category from "../models/Category";

const itemsRouter = express.Router();

itemsRouter.post("/", authentication, imagesUpload.single("image"), async (req, res, next) => {
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
        const {category} = req.query;
        let filter = {};

        if (category) {
            const categoryDb = await Category.findById(category);

            if (!categoryDb) {
                res.status(400).send({error: "Category not found"});
                return;
            }
            filter = {category};
        }

        const items = await Item.find(filter).select("title price image category");

        res.send(items);

    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

itemsRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const items = await Item.findById(id).populate([
            {
                path: "user",
                select: "displayName phone",
            },
            {
                path: "category",
            },
        ]);

        if (!items) {
            res.status(400).send({error: "Item not Found"});
            return;
        }

        res.send(items);

    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

itemsRouter.delete("/:id", authentication, async (req, res, next) => {
    try {
        const {id} = req.params
        await Item.deleteOne({_id: id});
        res.send({message: "Item deleted successfully."});
    } catch (err) {
        if (err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

export default itemsRouter;