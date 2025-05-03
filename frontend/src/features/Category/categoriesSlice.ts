import {ICategory} from "../../types.s.ts";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./categoriesThunks.ts";

interface categoryState {
    categories: ICategory[];
    loading: boolean;
}

const initialState: categoryState = {
    categories: [],
    loading: false,
}

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.categories = payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false;
            })

    }
});

export const categoriesReducers = categoriesSlice.reducer;