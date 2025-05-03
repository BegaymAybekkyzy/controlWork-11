import React, {useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegistrationErrors, selectRegistrationLoading} from "./userSlice.ts";
import {registration} from "./userThunks.ts";
import {IUserForm} from "../../types.s.ts";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";


const Registration = () => {
    const [form, setForm] = useState<IUserForm>({
        username: "",
        password: "",
        displayName: "",
        phone: null
    });

    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegistrationErrors);
    const loading = useAppSelector(selectRegistrationLoading);
    const navigate = useNavigate();

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(registration(form)).unwrap();
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

    let errorIsUsername: React.ReactNode;

    if (error && "error" in error){
        errorIsUsername = (
            <Typography
                textAlign="center"
                color="#fa4d4d"
                marginBottom={4}
            >{error.error}</Typography>
        );
    }

    return (
        <div>
            <Typography
                variant={"h3"}
                color="textSecondary"
                textAlign="center"
                marginBottom={5}
            >Register</Typography>

            {errorIsUsername}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <form onSubmit={onSubmitForm}>
                    <Grid container spacing={2} marginBottom={3} justifyContent="center" alignItems="center">
                        <Grid size={9}>
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
                        <Grid size={9}>
                            <TextField
                                fullWidth
                                label="Password"
                                disabled={loading}
                                helperText={getErrors("password")}
                                error={Boolean(getErrors("password"))}
                                value={form.password}
                                name="password"
                                onChange={onChangeInput}
                                variant="outlined" />
                        </Grid>

                        <Grid size={9}>
                            <TextField
                                fullWidth
                                label="displayName"
                                disabled={loading}
                                helperText={getErrors("displayName")}
                                error={Boolean(getErrors("displayName"))}
                                value={form.displayName}
                                name="displayName"
                                onChange={onChangeInput}
                                variant="outlined" />
                        </Grid>

                        <Grid size={9}>
                            <TextField
                                fullWidth
                                label="phone"
                                disabled={loading}
                                helperText={getErrors("phone")}
                                error={Boolean(getErrors("phone"))}
                                value={form.phone}
                                name="phone"
                                onChange={onChangeInput}
                                variant="outlined" />
                        </Grid>

                        <Grid size={9}>
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