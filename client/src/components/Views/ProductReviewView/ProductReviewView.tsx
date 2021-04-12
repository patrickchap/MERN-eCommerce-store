import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { rootStore } from "../../../RootStore";
import { observer } from "mobx-react-lite";
import { StylesProvider } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { CSSProperties } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

interface params {
  id: string | undefined;
}
interface inputs {
  rating: number;
  review: string;
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
  const { product, loadProduct } = root.ProductStore;
  const [value, setValue] = React.useState<number>(0);
  const { register, handleSubmit, errors } = useForm<inputs>();

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id, loadProduct]);

  const onSubmit = (e: inputs) => {
    const newRating: inputs = {
      rating: value,
      review: e.review,
    };
    console.log(newRating);
    console.log(">>>>>>>>>>>>>>");
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

          <label htmlFor="review">
            <strong>Add a written review</strong>
          </label>
          <textarea
            name="review"
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
