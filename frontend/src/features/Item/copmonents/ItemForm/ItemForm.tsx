import React, {useState} from 'react';
import {ICategory, IItemForm} from "../../../../types.s.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, Button, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {addNewItem} from "../../itemsThunks.ts";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {selectItemCreationLoading, selectItemError} from "../../itemsSlice.ts";
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    categories: ICategory[];
}

const ItemForm: React.FC<Props> = ({categories}) => {
    const [form, setForm] = useState<IItemForm>({
        title: "",
        description: "",
        image: null,
        category: "",
        price: 0,
    });

    const dispatch = useAppDispatch();
    const error = useAppSelector(selectItemError);
    const loading = useAppSelector(selectItemCreationLoading);
    const navigate = useNavigate();

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(addNewItem(form)).unwrap();
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

    const fileInputChangeHandler = (
        eFile: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const {files} = eFile.target;

        if (files) {
            setForm((prev) => ({...prev, image: files[0]}));
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const handleChange = (event: SelectChangeEvent) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    };

    let errorIsUsername: React.ReactNode;

    if (error && "error" in error) {
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
            >Add item</Typography>

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
                                label="Title"
                                name="title"
                                disabled={loading}
                                helperText={getErrors("title")}
                                error={Boolean(getErrors("title"))}
                                value={form.title}
                                onChange={onChangeInput}
                                variant="outlined"/>
                        </Grid>

                        <Grid size={9}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                fullWidth
                                value={form.category}
                                name="category"
                                label="Category"
                                error={Boolean(getErrors("category"))}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Select category</MenuItem>
                                {categories.map(category => (
                                    <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{getErrors("category")}</FormHelperText>
                        </Grid>

                        <Grid size={9}>
                            <TextField
                                fullWidth
                                label="Description"
                                disabled={loading}
                                helperText={getErrors("description")}
                                error={Boolean(getErrors("description"))}
                                value={form.description}
                                name="description"
                                onChange={onChangeInput}
                                variant="outlined"/>
                        </Grid>

                        <Grid size={9}>
                        <TextField
                            fullWidth
                            label="Price"
                            disabled={loading}
                            helperText={getErrors("price")}
                            error={Boolean(getErrors("price"))}
                            value={form.price}
                            name="price"
                            onChange={onChangeInput}
                            variant="outlined"/>
                    </Grid>

                        <Grid size={9}>
                            <FileInput
                                name='image'
                                label='Image'
                                onChange={fileInputChangeHandler}
                            />
                        </Grid>

                        <Grid size={9}>
                            <Button
                                variant="contained"
                                sx={{backgroundColor: "#5F9EA0"}}
                                type="submit"
                                color="primary"
                                disabled={loading}
                            >Add</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    );
};

export default ItemForm;