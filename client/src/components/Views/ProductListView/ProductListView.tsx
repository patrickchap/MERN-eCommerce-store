import React, { useContext, useEffect } from "react";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import "./ProductListView.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const styles = {
  home: {
    width: "65%",
    margin: "0px auto",
    paddingTop: "30px",
  },
};

const ProductListView: React.FC = observer(() => {
  const root = useContext(rootStore);
  const { userInfo } = root.UserStore;
  const {
    products,
    createNewProduct,
    loadProducts,
    deleteProduct,
  } = root.ProductStore;
  const history = useHistory();

  const createProduct = () => {
    if (userInfo?._id) {
      createNewProduct(userInfo?.token).then((response) =>
        history.push(`/products/edit/${response}`)
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, [products, createNewProduct, loadProducts]);

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
              <td
                onClick={() => history.push(`/products/edit/${product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <EditIcon />
              </td>
              <td>
                <DeleteForeverIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (userInfo) {
                      deleteProduct(userInfo.token, product._id);
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ProductListView;
