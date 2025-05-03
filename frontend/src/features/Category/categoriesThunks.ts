import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategory} from "../../types.s.ts";
import axiosAPI from "../../axiosAPI.ts";

export const fetchCategories = createAsyncThunk<ICategory[], void>(
    "categories/fetchCategories",
    async () => {
        const response = await axiosAPI("categories");
        return response.data;
    }
)