import {IDetailedError, IError, IItem, IItemDetail} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {addNewItem, deleteItem, fetchAllItems, fetchByIdItem} from "./itemsThunks.ts";


interface ItemsState {
    allItems: IItem[];
    detailItem: IItemDetail | null;
    fetchingLoading: boolean;
    creationLoading: boolean;
    deletionLoading: boolean;
    error: IDetailedError | IError | null;
}

const initialState: ItemsState = {
    allItems: [],
    detailItem: null,
    fetchingLoading: false,
    creationLoading: false,
    deletionLoading: false,
    error: null,
}

export const selectAllItems = (state: RootState) => state.items.allItems;
export const selectDetailItem = (state: RootState) => state.items.detailItem;
export const selectItemFetchingLoading = (state: RootState) => state.items.fetchingLoading;
export const selectItemCreationLoading = (state: RootState) => state.items.creationLoading;
export const selectItemDeletionLoading = (state: RootState) => state.items.deletionLoading;
export const selectItemError = (state: RootState) => state.items.error;

console.log("Creating itemsSlice...");

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllItems.pending, (state) => {
                state.fetchingLoading = true;
                state.error = null;
            })
            .addCase(fetchAllItems.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.allItems = payload;
                state.error = null;
            })
            .addCase(fetchAllItems.rejected, (state, {payload}) => {
                state.fetchingLoading = false;
                state.error = payload || null;
            })

            .addCase(fetchByIdItem.pending, (state) => {
                state.fetchingLoading = true;
                state.error = null;
            })
            .addCase(fetchByIdItem.fulfilled, (state, {payload})=> {
                state.fetchingLoading = false;
                state.detailItem = payload;
                state.error = null;
            })
            .addCase(fetchByIdItem.rejected, (state, {payload}) => {
                state.fetchingLoading = false;
                state.error = payload || null;
            })

            .addCase(addNewItem.pending, (state) => {
                state.creationLoading = true;
                state.error = null;
            })
            .addCase(addNewItem.fulfilled, (state) => {
                state.creationLoading = false;
                state.error = null;
            })
            .addCase(addNewItem.rejected, (state, {payload}) => {
                state.creationLoading = false;
                state.error = payload || null;
            })

            .addCase(deleteItem.pending, (state) => {
                state.deletionLoading = true;
            })
            .addCase(deleteItem.fulfilled, (state) => {
                state.deletionLoading = false;
            })
            .addCase(deleteItem.rejected, (state) => {
                state.deletionLoading = false;
            })
    }
});

export const itemsReducers = itemsSlice.reducer;