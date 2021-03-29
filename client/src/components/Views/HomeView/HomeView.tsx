import React, { useContext } from "react";
import "./HomeView.css";
import Grid from "@material-ui/core/Grid";
import Product from "../../Product/Product";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";

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
  subcategory: string;
}

const Home: React.FC = observer(() => {
  const root = useContext(rootStore);
  const { products } = root.ProductStore;

  return (
    <div className="home">
      <Grid container>
        {products.map((prod: prod) => {
          return (
            <Grid item sm={12} md={6} lg={4} xl={3}>
              <Product prod={prod} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
});

export default Home;
