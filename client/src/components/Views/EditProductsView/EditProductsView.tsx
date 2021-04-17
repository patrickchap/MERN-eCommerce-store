import Button from "@material-ui/core/Button";
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./EditProductsView.css";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const styles = {
  home: {
    width: "50%",
    margin: "0px auto",
    paddingTop: "30px",
  },
};

interface updateProduct {
  name: string;
  price: number;
  countInStock: number;
  image: string;
  category: string;
  subcategory: string;
  description: string;
}

const EditProductsView: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const root = useContext(rootStore);
  const { userInfo } = root.UserStore;
  const { loadProduct, product, updateProduct } = root.ProductStore;
  const history = useHistory();

  useEffect(() => {
    loadProduct(id);
  }, [id, loadProduct]);

  const { register, handleSubmit } = useForm<updateProduct>();

  const onSubmit = (e: updateProduct) => {
    if (userInfo) {
      updateProduct(userInfo.token, e, id);
      history.push("/productsList");
    }
  };

  return (
    <div className="editProductsView" style={styles.home}>
      <h2>Edit Product</h2>
      <form
        className="editProductsView__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name */}
        <label htmlFor="name" className="shippingView__label">
          Name
        </label>
        <input
          name="name"
          placeholder={product.name}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="name"
        />
        {/* price */}
        <label htmlFor="price" className="shippingView__label">
          Price
        </label>
        <input
          name="price"
          placeholder={`${product.price}`}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="price"
        />
        {/* countInStockInStock */}
        <label htmlFor="countInStock" className="shippingView__label">
          Count In Stock
        </label>
        <input
          name="countInStock"
          placeholder={`${product.countInStock}`}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="count"
        />
        {/* image */}
        <label htmlFor="image" className="shippingView__label">
          Image
        </label>
        <input
          name="image"
          placeholder={product.image}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="image"
        />
        {/* category */}
        <label htmlFor="category" className="shippingView__label">
          Category
        </label>
        <input
          name="category"
          placeholder={product.category}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="category"
        />
        {/* subcategory */}
        <label htmlFor="subcategory" className="shippingView__label">
          Subcategory
        </label>
        <input
          name="subcategory"
          placeholder={product.subcategory}
          type="text"
          ref={register({ required: false })}
          className="shippingView__form__input"
          id="subcategory"
        />
        {/* description */}
        <label htmlFor="description" className="shippingView__label">
          Description
        </label>
        <textarea
          name="description"
          placeholder={product.description}
          //   {...register("description")}
          ref={register({ required: false })}
          id="description"
          className="shippingView__form__input"
          style={{ resize: "vertical", height: 100 }}
        />

        <Button
          type="submit"
          variant="contained"
          className="registerUserView__form__submit"
          style={{
            backgroundColor: "black",
            color: "white",
            paddingTop: "0px",
            paddingBottom: "0px",
            height: "40px",
          }}
          //   onClick={createProduct}
        >
          Update Product
        </Button>
      </form>
    </div>
  );
});

export default EditProductsView;
