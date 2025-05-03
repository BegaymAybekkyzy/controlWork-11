import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAllItems} from "./itemsThunks.ts";
import {selectAllItems, selectItemFetchingLoading} from "./itemsSlice.ts";
import {Grid, Typography} from "@mui/material";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ItemCard from "./copmonents/ItemCard/ItemCard.tsx";
import {fetchCategories} from "../Category/categoriesThunks.ts";
import {selectCategories} from "../Category/categoriesSlice.ts";
import {ListGroup} from "react-bootstrap";

const ItemsList = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectItemFetchingLoading);
    const allItems = useAppSelector(selectAllItems);
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchAllItems());
        dispatch(fetchCategories());
    }, [dispatch]);

    const categorySelection = async (categoryId: string) => {
        await dispatch(fetchAllItems(categoryId));
    }

    let content: React.ReactNode = <Typography variant={"h4"}></Typography>

    if (loading) {
        content = (<div
            style={{ height: "80vh" }}
            className="d-flex align-items-center justify-content-center"
        >
            <Loader />
        </div>)
    }

    if (!loading && allItems.length > 0) {
        content = (
            <div
                className="row g-4">
                {allItems.map((item) => (
                    <div className="col-4" key={item._id}>
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>
        );
    }


    return (
        <main>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Typography variant={"h5"}>Categories</Typography>
                    <ListGroup>
                        {categories.map(category => (
                            <ListGroup.Item onClick={() => categorySelection(category._id)} key={category._id}
                            >{category.title}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Grid>
                <Grid size={9}>
                    {content}
                </Grid>
            </Grid>
        </main>
    );
};

export default ItemsList;