import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAllItems} from "./itemsThunks.ts";
import {selectAllItems, selectItemFetchingLoading} from "./itemsSlice.ts";
import { Grid, Typography} from "@mui/material";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ItemCard from "./copmonents/ItemCard/ItemCard.tsx";
import {fetchCategories} from "../Category/categoriesThunks.ts";
import {selectCategories} from "../Category/categoriesSlice.ts";
import {ListGroup, Button} from "react-bootstrap";

const ItemsList = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectItemFetchingLoading);
    const allItems = useAppSelector(selectAllItems);
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchAllItems());
        dispatch(fetchCategories());
    }, [dispatch]);

    const categorySelection = async (categoryId?: string) => {
        if (categoryId) {
            await dispatch(fetchAllItems(categoryId))
        }else {
            await dispatch(fetchAllItems())
        }
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
            <Grid container spacing={3}>
                <Grid size={3}>
                    <Typography
                        variant={"h4"}
                        textAlign="center"
                        sx={{color: "#00695c"}}
                        marginBottom={1}
                    >Categories</Typography>
                    <ListGroup>
                        <ListGroup.Item
                            as="li"
                            action
                            onClick={() => categorySelection()}
                            className="d-flex justify-content-between align-items-center justify-content-center"
                        >
                            <Button
                                variant="link"
                                className="p-0 fs-5 d-block text-decoration-none"
                                style={{color: "#424242"}}
                            >All categories</Button>
                        </ListGroup.Item>
                        {categories.map(category => (
                            <ListGroup.Item
                                as="li"
                                action
                                onClick={() => categorySelection(category._id)}
                                key={category._id}
                                className="d-flex justify-content-between align-items-center justify-content-center"
                            >
                                <Button
                                    variant="link"
                                    className="p-0 fs-5 d-block text-decoration-none"
                                    style={{color: "#424242"}}
                                >{category.title}</Button>
                            </ListGroup.Item>
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