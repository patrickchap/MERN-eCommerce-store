import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import { StylesProvider } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { CSSProperties } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

interface params {
  id: string | undefined;
}
interface productReviewInputs {
  rating: number;
  comment: string;
}

const styles = {
  home: {
    width: "65%",
    margin: "0px auto",
    paddingTop: "30px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    resize: "vertical",
    marginBottom: "20px",
  } as CSSProperties,

  form: {
    marginTop: "20px",
  },

  rating: {
    marginBottom: "20px",
  },
};

const ProductReviewView: React.FC = observer(() => {
  const { id } = useParams<params>();
  const root = useContext(rootStore);
  const {
    product,
    loadProduct,
    postProductReview,
    loadProducts,
  } = root.ProductStore;
  const { userInfo } = root.UserStore;

  const [value, setValue] = React.useState<number>(0);
  const { register, handleSubmit, errors } = useForm<productReviewInputs>();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id, loadProduct]);

  const onSubmit = (e: productReviewInputs) => {
    const newRating: productReviewInputs = {
      rating: value,
      comment: e.comment,
    };
    if (id && userInfo?.token) {
      console.log(newRating);
      postProductReview(newRating, id, userInfo.token);
      //   loadProducts();
      history.push(`/product/${id}`);
    }
  };

  return (
    <div className="productReviewView" style={styles.home}>
      <div className="productReviewView__description">
        <strong>{`Create a review for ${product.name}`}</strong>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div className="productReviewView__rating" style={styles.rating}>
            <Rating
              name="rating"
              value={value}
              style={{ color: "black" }}
              onChange={(event, newValue) => {
                if (newValue) setValue(newValue);
              }}
            />
          </div>

          <label htmlFor="comment">
            <strong>Add a written review</strong>
          </label>
          <textarea
            name="comment"
            id="review"
            style={styles.textarea}
            ref={register({ required: true })}
          />

          <Button
            type="submit"
            variant="contained"
            className="registerUserView__form__submit"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
});

export default ProductReviewView;
