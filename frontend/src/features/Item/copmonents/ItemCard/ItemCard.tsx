import React from 'react';
import {IItem} from '../../../../types.s';
import {BASE_URL, CURRENCY} from "../../../../constants.ts";
import {useNavigate} from "react-router-dom";
import {Card, CardMedia, CardContent, Typography, CardActionArea} from "@mui/material";

interface Props {
    item: IItem
}

const ItemCard: React.FC<Props> = ({item}) => {
    let imagePath = BASE_URL + item.image;
    const navigate = useNavigate();

    return (
        <Card sx={{maxWidth: 345}} onClick={() => navigate(`item-detail/${item._id}`)}>
            <CardActionArea>
                <CardMedia
                    sx={{height: 340}}
                    image={imagePath}
                    title={item.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {item.price} {CURRENCY}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
};

export default ItemCard;