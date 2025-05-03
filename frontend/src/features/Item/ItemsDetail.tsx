import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteItem, fetchByIdItem} from "./itemsThunks.ts";
import {selectDetailItem, selectItemError, selectItemFetchingLoading} from "./itemsSlice.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {BASE_URL} from "../../constants.ts";
import {Box, Button, Grid, Typography} from "@mui/material";
import {selectUser} from "../User/userSlice.ts";

const ItemsDetail = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectDetailItem);
    const loading = useAppSelector(selectItemFetchingLoading);
    const user = useAppSelector(selectUser);
    const [nonOwner, setNonOwner] = useState(false)

    useEffect(() => {
        if (!id) return;
        dispatch(fetchByIdItem(id));
    }, [dispatch, id]);


    let content: React.ReactNode;

    const onDeleteItem = async () => {
        if (user && item && item.user._id !== user._id) {
            setNonOwner(true)
            return;
        }

        const warning = confirm("Are you sure you want to delete this item?");
        if (!warning) return;
        dispatch(deleteItem(item._id));
    }

    if (!item) return;

    if (loading) {
        content = (
            <div
                style={{height: '80vh'}}
                className="d-flex align-items-center justify-content-center"
            >
                <Loader/>
            </div>
        );
    }

    if (item) {
        content = (
            <Box p={4}>
                <Typography variant="h4" gutterBottom>
                    {item.title}
                </Typography>
                <Grid container spacing={4}>
                    <Grid size={3}>
                        <img
                            src={BASE_URL + item.image}
                            alt={item.title}
                            style={{width: "100%", height: "auto", borderRadius: 8}}
                        />
                    </Grid>

                    <Grid size={5}>

                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Typography variant="h6">Description</Typography>
                                <Typography>{item.description}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="h6">Price</Typography>
                                <Typography>{item.price} KGS</Typography>
                            </Grid>

                            <Grid size={6}>
                                <Typography variant="h6">Category</Typography>
                                <Typography>{item.category.title}</Typography>
                            </Grid>
                            <Grid size={6}>
                                <Typography variant="h6">Seller</Typography>
                                <Typography>{item.user.displayName}</Typography>
                                <Typography>{item.user.phone}</Typography>
                            </Grid>
                        </Grid>

                        {user && (
                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    sx={{backgroundColor: "#5F9EA0"}}
                                    onClick={onDeleteItem}
                                >Sold
                                </Button>

                                {nonOwner &&
                                    <Typography
                                        color="secondary"
                                        marginTop={4}
                                    >You can't remove an item if you don't own it</Typography>}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default ItemsDetail;