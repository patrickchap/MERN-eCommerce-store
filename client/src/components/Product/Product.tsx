import React from "react";
import "./Product.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "../MyRating/MyRating";
import { NavLink } from "react-router-dom";
interface prod {
  _id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface props {
  prod: prod;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      paddingTop: "100%",
    },
  })
);

const Product: React.FC<props> = ({ prod }) => {
  const classes = useStyles();
  return (
    <div className="products">
      <Card className="products__card">
        <NavLink className="products__card__link" to={`product/${prod._id}`}>
          <CardMedia
            className={classes.media}
            image={prod.image}
            title={prod.name}
          />
        </NavLink>
        <CardContent>
          <NavLink className="products__card__link" to={`product/${prod._id}`}>
            <Typography gutterBottom variant="h6" component="div">
              {prod.name}
            </Typography>
          </NavLink>
          <Typography variant="caption" component="div">
            <Rating rating={prod.rating} reviews={prod.numReviews} />
          </Typography>

          <Typography variant="h6" component="h6">
            {`$${prod.price}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
