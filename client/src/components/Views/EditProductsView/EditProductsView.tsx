import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditProductsView.css";

const styles = {
  home: {
    width: "50%",
    margin: "0px auto",
    paddingTop: "30px",
  },
};

const EditProductsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //   useEffect(() => {}, []);

  return (
    <div className="editProductsView" style={styles.home}>
      <h2>Edit Product</h2>
      <form className="editProductsView__form">
        {/* name */}
        <label htmlFor="name" className="shippingView__label">
          Name
        </label>
        <input
          name="name"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="name"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* price */}
        <label htmlFor="price" className="shippingView__label">
          Price
        </label>
        <input
          name="price"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="price"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* countInStock */}
        <label htmlFor="count" className="shippingView__label">
          Count In Stock
        </label>
        <input
          name="count"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="count"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* image */}
        <label htmlFor="imp" className="shippingView__label">
          Image
        </label>
        <input
          name="imp"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="imp"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* category */}
        <label htmlFor="category" className="shippingView__label">
          Category
        </label>
        <input
          name="category"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="category"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* subcategory */}
        <label htmlFor="subcategory" className="shippingView__label">
          Subcategory
        </label>
        <input
          name="subcategory"
          //   placeholder="Enter Country"
          type="text"
          //   ref={register({ required: true })}
          className="shippingView__form__input"
          id="subcategory"
          //   value={country}
          //   onChange={(e) => handleCountryChange(e)}
        />
        {/* description */}
        <label htmlFor="description" className="shippingView__label">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="shippingView__form__input"
          style={{ resize: "vertical", height: 100 }}
        />

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
          //   onClick={createProduct}
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProductsView;
