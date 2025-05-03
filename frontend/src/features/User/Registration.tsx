import React, {useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegistrationErrors, selectRegistrationLoading} from "./userSlice.ts";
import {registration} from "./userThunks.ts";
import {IUserForm} from "../../types.s.ts";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const initialValue: IUserForm = {
    username: "",
    password: "",
}

const Registration = () => {
    const [form, setForm] = useState(initialValue);
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegistrationErrors);
    const loading = useAppSelector(selectRegistrationLoading);
    const navigate = useNavigate();

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(registration(form)).unwrap();
        setForm(initialValue);
        navigate("/");
    };

    const getErrors = (fieldName: string) => {
        try {
            if (error && 'errors' in error) {
                return error.errors[fieldName].message;
            }
        } catch (e) {
            return undefined;
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <Typography
                variant={"h3"}
                color="textSecondary"
                textAlign="center"
                marginBottom={5}
            >Register</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <form onSubmit={onSubmitForm}>
                    <Grid container spacing={2} marginBottom={3}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="username"
                                disabled={loading}
                                helperText={getErrors("username")}
                                error={Boolean(getErrors("username"))}
                                value={form.username}
                                onChange={onChangeInput}
                                variant="outlined" />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Password"
                                disabled={loading}
                                helperText={getErrors("password")}
                                error={Boolean(getErrors("password"))}
                                value={form.password}
                                name="password"
                                onChange={onChangeInput}
                                variant="outlined" />
                        </Grid>

                        <Grid size={12}>
                            <Button
                                variant="contained"
                                sx={{backgroundColor: "#5F9EA0"}}
                                type="submit"
                                color="primary"
                                disabled={loading}
                            >Sign in</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    );
};

export default Registration;