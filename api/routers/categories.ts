import express from "express";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    }catch(err) {
        next(err);
    }
});

export default categoriesRouter;