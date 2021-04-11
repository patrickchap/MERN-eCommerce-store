import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";
import "./ReviewView.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import OrderSummary from "../../OrderSumary/OrderSummary";

interface props {
  ShippingFlow: React.FC<{}>;
}

const ReviewView: React.FC<props> = observer(({ ShippingFlow }) => {
  const root = useContext(rootStore);
  const { CartStore } = root;
  const { cartItems, updateReviewFlow } = CartStore;
  let history = useHistory();

  return (
    <div className="reviewView">
      <div
        className="reviewView__container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="reviewView__left" style={{ flex: 0.6 }}>
          <div className="reviewView__shippingFlow">
            <ShippingFlow />
          </div>
          <div className="reviewView__line">
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Total</h4>
          </div>
          {cartItems.map((itm) => (
            <div className="reviewView__line">
              <img className="reviewView__img" src={itm.image} alt="" />
              <p>{`$${itm.price}`}</p>
              <p>{itm.qty}</p>
              <p>{`$${itm.countInStock * itm.price}`}</p>
            </div>
          ))}
          <div className="reviewView__form__buttons">
            <Button
              type="button"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => history.push("/shipping/delivery")}
            >
              Back to Delivery
            </Button>
            <Button
              type="button"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => {
                updateReviewFlow();
                history.push("/shipping/payment");
              }}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
        <div className="reviewView__right" style={{ flex: 0.3 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
});

export default ReviewView;
