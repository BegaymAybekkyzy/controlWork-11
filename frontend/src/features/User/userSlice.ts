import {IDetailedError, IError, IUser} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {registration, authentication} from "./userThunks.ts";

interface userState {
    user: IUser | null;
    registrationLoading: boolean;
    registrationErrors: IDetailedError | null;
    authenticationLoading: boolean;
    authenticationErrors: IError | null;
}

const initialState: userState = {
    user: null,
    registrationLoading: false,
    registrationErrors: null,
    authenticationLoading: false,
    authenticationErrors: null,
}

export const selectUser = (state: RootState) => state.users.user;
export const selectRegistrationErrors = (state: RootState) => state.users.registrationErrors;
export const selectAuthenticationErrors = (state: RootState) => state.users.authenticationErrors;
export const selectRegistrationLoading = (state: RootState) => state.users.registrationLoading;
export const selectAuthenticationLoading = (state: RootState) => state.users.authenticationLoading;

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        systemLogout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.registrationLoading = true;
                state.registrationErrors = null;
            })
            .addCase(registration.fulfilled, (state, {payload}) => {
                state.registrationLoading = false;
                state.registrationErrors = null;
                state.user = payload;
            })
            .addCase(registration.rejected, (state, {payload}) => {
                state.registrationLoading = false;
                state.registrationErrors = payload || null;
            })

            .addCase(authentication.pending, (state) => {
                state.authenticationLoading = true;
                state.authenticationErrors = null;
            })
            .addCase(authentication.fulfilled, (state, {payload}) => {
                state.authenticationLoading = false;
                state.authenticationErrors = null;
                state.user = payload;
            })
            .addCase(authentication.rejected, (state, {payload}) => {
                state.authenticationLoading = false;
                state.authenticationErrors = payload || null;
            })
    }
});

export const userReducer = usersSlice.reducer;
export const {systemLogout} = usersSlice.actions;