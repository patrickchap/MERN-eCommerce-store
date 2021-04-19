import Button from "@material-ui/core/Button";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditProductsView.css";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  const [imageURL, setImageURL] = useState(product.image);

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

  const handleImageChange = (e: any) => {
    setImageURL(e.target.value);
  };

  const handlePhoto = (e: any) => {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("photo", file);
    console.log("axios");

    axios
      .post("/api/upload/photo", formData)
      .then((res) => {
        setImageURL(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="editProductsView" style={styles.home}>
      <h2>Edit Product</h2>
      <form
        className="editProductsView__form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
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
          value={imageURL}
          onChange={(e) => handleImageChange(e)}
        />
        <input type="file" name="photo" onChange={handlePhoto} />
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
