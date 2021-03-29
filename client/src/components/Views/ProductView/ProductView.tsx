import React, { useEffect, useContext, useState } from "react";
import "./ProductView.css";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MyRating from "../../MyRating/MyRating";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { RouteComponentProps } from "react-router";

interface params {
  id: string | undefined;
}

const createArray = (size: number): Array<number> => {
  let arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  return arr;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "100%",
    },
  })
);

const ProductView: React.FC<RouteComponentProps> = observer(({ history }) => {
  const [quantity, setQuantity] = useState<number | unknown>(1);
  const { id } = useParams<params>();
  const root = useContext(rootStore);
  const { ProductStore } = root;
  const { product } = ProductStore;

  useEffect(() => {
    if (id) {
      ProductStore.loadProduct(id);
    }
  }, [ProductStore, id]);

  const classes = useStyles();

  return (
    <div className="productView">
      <Grid
        container
        className="productView__container"
        direction="row"
        spacing={3}
      >
        <Grid item xs={12} sm={12} md={5}>
          <Card className="productView__card">
            <CardContent>
              <CardMedia
                className={classes.media}
                image={product?.image}
                title={product?.name}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <List>
            <ListItem>
              <Typography gutterBottom variant="h6" component="div">
                {product?.name}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <MyRating rating={product.rating} reviews={product.numReviews} />
            </ListItem>
            <Divider />
            <ListItem>
              <Typography gutterBottom variant="caption" component="h6">
                {`Price $${product?.price}`}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography gutterBottom variant="caption" component="div">
                {product?.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={12} md={3}>
          <Card className="productView__right">
            <List>
              <ListItem>
                <div className="productView__right__row">
                  <Grid container justify="flex-end" alignItems="center">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      price
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ textAlign: "right", paddingRight: "10px" }}
                    >
                      {product?.price}
                    </Grid>
                  </Grid>
                </div>
              </ListItem>
              <Divider />
              <ListItem>
                <div className="productView__right__row">
                  <Grid container justify="flex-end" alignItems="center">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      In Stock:
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ textAlign: "right", paddingRight: "10px" }}
                    >
                      {product.countInStock}
                    </Grid>
                  </Grid>
                </div>
              </ListItem>
              <Divider />

              {product.countInStock > 0 && (
                <>
                  <ListItem>
                    <div className="productView__right__row">
                      <Grid container justify="flex-end" alignItems="center">
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          Quantity:
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <>
                            <FormControl>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                              >
                                {createArray(product.countInStock).map(
                                  (num) => {
                                    return (
                                      <MenuItem value={num}>{num}</MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                            </FormControl>
                          </>
                        </Grid>
                      </Grid>
                    </div>
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {/* <NavLink to={`/cart/${id}?qty=${quantity}`}> */}
                    <Button
                      variant="contained"
                      disabled={product?.countInStock === 0 ? true : false}
                      style={{
                        backgroundColor:
                          product?.countInStock === 0 ? "gray" : "Black",
                        color: "white",
                        width: "100%",
                      }}
                      onClick={() => {
                        if (product?.countInStock !== 0)
                          history.push(`/cart/${id}?qty=${quantity}`);
                      }}
                    >
                      Add To Cart
                    </Button>
                    {/* </NavLink> */}
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        className="registerUserView__form__submit"
        style={{
          backgroundColor: "black",
          color: "white",
          marginTop: "20px",
        }}
        onClick={() => history.push(`review/${product._id}`)}
      >
        Write a Review
      </Button>

      <List>
        <ListItem>
          <Typography gutterBottom variant="h4" component="div">
            Reviews
          </Typography>
        </ListItem>

        {product.reviews.map((prod) => {
          return (
            <List>
              <ListItem>
                <Typography gutterBottom variant="h6" component="p">
                  {prod.name}
                  <MyRating rating={prod.rating} reviews={undefined} />
                </Typography>
              </ListItem>
              <ListItem>
                <div></div>
                <Typography gutterBottom variant="subtitle1" component="p">
                  {prod.comment}
                </Typography>
              </ListItem>
              <Divider />
            </List>
          );
        })}
      </List>
    </div>
  );
});

export default ProductView;
