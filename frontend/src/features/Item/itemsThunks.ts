import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IDetailedError, IItem, IItemDetail, IItemForm} from "../../types.s.ts"
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

export const fetchAllItems = createAsyncThunk<
    IItem[],
    string | undefined,
{rejectValue: IDetailedError}
>(
    "items/fetchItems",
        async (categoryId, {rejectWithValue}) => {
            try {
                const url = categoryId ? `items?category=${categoryId}` : "items";
                const response = await axiosAPI(url);
                return response.data;
            } catch (err) {
                if (isAxiosError(err) && err.response && err.response.status === 401 || err.response.status === 400) {
                    return rejectWithValue(err.response.data);
                }
                throw err;
            }
        }
);

export const fetchByIdItem = createAsyncThunk<
    IItemDetail,
    string,
    {rejectValue: IDetailedError}
>(
    "items/fetchByIdItem",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosAPI("items/" + id);
            return response.data;
        }catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 401 || err.response.status === 400) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const addNewItem =createAsyncThunk<
    void,
    IItemForm,
    {rejectValue: IDetailedError, state: RootState}
>(
    "items/addNewItem",
    async (newItem, options) => {
        try {
            const token = options.getState().users.user?.token;
            const formData = new FormData();
            const keys = Object.keys(newItem) as (keyof IItemForm)[];

            keys.forEach(key => {
                const value = newItem[key] as string;
                if (value !== null) {
                    formData.append(key, value);
                }
            });
            const response = await axiosAPI.post("items/", formData,{headers: {Authorization: `Bearer ${token}`}});
            return response.data;
        }catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 401 || err.response.status === 400) {
                return options.rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const deleteItem =  createAsyncThunk<
    void,
    string,
    { state: RootState }
>(
    "items/deleteItem",
    async (id, store) => {
        try {
            const token = store.getState().users.user?.token;
            const response = await axiosAPI.delete("items/" + id, {headers: {Authorization: `Bearer ${token}`}});
            return response.data;
        }catch (err) {
            console.error(err)
        }
    }
);