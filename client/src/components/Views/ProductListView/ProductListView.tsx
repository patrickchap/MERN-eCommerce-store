import React, { useContext } from "react";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import "./ProductListView.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const styles = {
  home: {
    width: "65%",
    margin: "0px auto",
    paddingTop: "30px",
  },
};

const ProductListView: React.FC = observer(() => {
  const root = useContext(rootStore);
  const { products } = root.ProductStore;
  const history = useHistory();

  const createProduct = () => {
    history.push("/products/edit/1");
  };

  return (
    <div className="productListView" style={styles.home}>
      <div className="productList__top">
        <h2 className="productListView__label">Products</h2>
        <Button
          type="button"
          variant="contained"
          className="registerUserView__form__submit"
          style={{
            backgroundColor: "black",
            color: "white",
            paddingTop: "0px",
            paddingBottom: "0px",
            height: "40px",
          }}
          onClick={createProduct}
        >
          Create Product
        </Button>
      </div>
      <table className="productsTable">
        <thead>
          <td>ID</td>
          <td>Name</td>
          <td>Category</td>
          <td>Subcategory</td>
          <td>Edit</td>
          <td>Delete</td>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.subcategory}</td>
              <td>...</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ProductListView;
