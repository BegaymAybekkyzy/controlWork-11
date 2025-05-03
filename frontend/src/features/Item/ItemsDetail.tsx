import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteItem, fetchByIdItem} from "./itemsThunks.ts";
import {selectDetailItem, selectItemDeletionLoading, selectItemFetchingLoading} from "./itemsSlice.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {BASE_URL} from "../../constants.ts";
import {Box, Button, Grid, Typography} from "@mui/material";
import {selectUser} from "../User/userSlice.ts";

const ItemsDetail = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectDetailItem);
    const loading = useAppSelector(selectItemFetchingLoading);
    const deletionLoading = useAppSelector(selectItemDeletionLoading);
    const user = useAppSelector(selectUser);
    const [nonOwner, setNonOwner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        dispatch(fetchByIdItem(id));
    }, [dispatch, id, user]);


    let content: React.ReactNode;

    if (!item || !user) content = (
        <Typography color="error" variant="h3">There was an error</Typography>
    );


    const onDeleteItem = async () => {
        if (user && item && item.user._id !== user._id) {
            setNonOwner(true)
            return;
        }

        const warning = confirm("Are you sure you want to delete this item?");
        if (!warning) return;
        dispatch(deleteItem(item._id));
        navigate("/");
    }

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
                <Typography variant="h4" sx={{color: "#00695c"}} marginBottom={2}>
                    {item.title}
                </Typography>
                <Grid container spacing={5}>
                    <Grid size={4}>
                        <img
                            src={BASE_URL + item.image}
                            alt={item.title}
                            style={{width: "100%", height: "auto", borderRadius: 8}}
                        />
                    </Grid>

                    <Grid size={5} marginY="auto">
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={6}>
                                <Typography variant="h5" sx={{color: "#00695c"}}>Price</Typography>
                                <Typography>{item.price} KGS</Typography>
                            </Grid>

                            <Grid size={6}>
                                <Typography variant="h5" sx={{color: "#00695c"}}>Category</Typography>
                                <Typography>{item.category.title}</Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="h5" sx={{color: "#00695c"}}>Seller</Typography>
                                <Typography>Name: <b>{item.user.displayName}</b>
                                </Typography>
                                <Typography>Phone: <b>{item.user.phone}</b></Typography>
                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid size={12}>
                            <Typography variant="h5" sx={{color: "#00695c"}}>Description</Typography>
                            <Typography>{item.description}</Typography>
                        </Grid>

                        {item.user._id === user._id && (
                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    sx={{backgroundColor: "#37474f"}}
                                    onClick={onDeleteItem}
                                    disabled={deletionLoading}
                                >Remove item
                                </Button>

                                {nonOwner &&
                                    <Typography
                                        color="error"
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
        <main>
            {content}
        </main>
    );
};

export default ItemsDetail;