import {useEffect} from 'react';
import ItemForm from "./copmonents/ItemForm/ItemForm.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategories} from "../Category/categoriesSlice.ts";
import {fetchCategories} from "../Category/categoriesThunks.ts";

const AddItem = () => {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <ItemForm categories={categories}/>
        </div>
    );
};

export default AddItem;