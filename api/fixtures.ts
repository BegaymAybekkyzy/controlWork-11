import mongoose from "mongoose";
import {config} from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("categories");
        await db.dropCollection("items");
    } catch (err) {
        console.log(err);
    }

    const [user1, user2] = await User.create(
        {
            username: "Bob",
            password: "baba",
            displayName: "super Bob",
            phone: "0123456789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1YmFjYTMzMjg5OTEzNDQ4MWFmNjciLCJpYXQiOjE3NDYyNTQ1MzgsImV4cCI6MTc3Nzc5MDUzOH0.7-aGa2VyB9XYZcu2D9CO9u2QOeR6-whQ-bOuGvPdNbc",
        },
        {
            username: "Alice",
            password: "baba",
            displayName: "alice",
            phone: "555555555",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1YmFlODMzMjg5OTEzNDQ4MWFmNmIiLCJpYXQiOjE3NDYyNTQ1NjgsImV4cCI6MTc3Nzc5MDU2OH0.lyJqGHYxsC1tkhPCi5F_7RDhFzOwvWkiPbi1yB0iWR8",
        }
    );

    const [category1, category2, category3, category4] = await Category.create(
        {
            title: "Clothes",
        },
        {
            title: "Tools",
        },
        {
            title: "Food",
        },
        {
            title: "Shoes",
        },
    );

    await Item.create(
        {
            user: user1,
            title: "Item1",
            category: category1,
            description: "Nice cloth",
            image: "images/c6b78833-f4bb-4f4c-baa4-07a83597ab3d.jpg",
            price: "300"
        },
        {
            user: user1,
            title: "Item2",
            category: category1,
            image: "images/8fc1df08-0835-4f16-818f-52bd73444fb5.jpg",
            description: "Red dress",
            price: "500"
        },
        {
            user: user1,
            title: "Item3",
            category: category4,
            description: "men's shoes",
            image: "images/ac7646ef-a20e-40ec-9d79-3bd745c94108.jpg",
            price: "300"
        },
        {
            user: user1,
            title: "Item4",
            category: category4,
            image: "images/ea69f616-1c0f-481f-9b71-eaeafa5a67c3.jpeg",
            description: "women's shoes",
            price: "500"
        },

        {
            user: user2,
            title: "Item5",
            category: category3,
            description: "Pizza",
            image: "images/fdaf2630-5f04-404b-8545-77e3119f037b.jpg",
            price: "700"
        },
        {
            user: user2,
            title: "Item6",
            category: category3,
            image: "images/697c35f8-505c-4839-8ced-bd3a87a6e9fa.jpg",
            description: "Bread",
            price: "50"
        },
        {
            user: user2,
            title: "Item7",
            category: category2,
            description: "Rake",
            image: "images/fa1e2a3e-7973-419b-8048-b6808d5c3407.jpg",
            price: "70"
        },
        {
            user: user2,
            title: "Item8",
            category: category2,
            image: "images/90427a7e-f63b-43df-a44d-5425c3790e99.jpg",
            description: "Saw",
            price: "50"
        }
    )
}

run().catch(console.error);