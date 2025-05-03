import mongoose, {Schema} from "mongoose";
import User from "./User";
import Category from "./Category";

const ItemSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (docId: string) => {
                const user = await User.findById(docId);
                return !!user;
            },
            message: "User not found",
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        validate: {
            validator: async (docId: string) => {
                const category = await Category.findById(docId);
                return !!category;
            },
            message: "Category not found",
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;