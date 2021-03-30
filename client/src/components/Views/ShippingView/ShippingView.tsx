import Button from "@material-ui/core/Button";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import "./ShippingView.css";
import { rootStore } from "../../../RootStore";
import { useHistory } from "react-router-dom";

type Inputs = {
  Address: string;
  City: string;
  PostalCode: number;
  Country: string;
};

interface props {
  ShippingFlow: React.FC<{}>;
}

const ShippingView: React.FC<props> = observer(({ ShippingFlow }) => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const root = useContext(rootStore);
  const { updateShippingDetail, shippingDetail } = root.CartStore;

  const onSubmit = (e: Inputs) => {
    updateShippingDetail(e);
    history.push("/shipping/delivery");
  };

  return (
    <div className="shippingView">
      <div className="shippingView__container">
        <div className="shippingView__shippingFlow">
          <ShippingFlow />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="shippingView__form">
          <label htmlFor="address" className="shippingView__label">
            Address
          </label>
          <input
            name="Address"
            placeholder="Enter Address"
            type="text"
            ref={register({ required: true })}
            className="shippingView__form__input"
            id="address"
          />

          <label htmlFor="city" className="shippingView__label">
            City
          </label>
          <input
            name="City"
            placeholder="Enter City"
            type="text"
            ref={register({ required: true })}
            className="shippingView__form__input"
            id="city"
          />

          <label htmlFor="postalCode" className="shippingView__label">
            Postal Code
          </label>
          <input
            name="PostalCode"
            placeholder="Enter Postal Code"
            type="text"
            ref={register({ required: true })}
            className="shippingView__form__input"
            id="postalCode"
          />

          <label htmlFor="country" className="shippingView__label">
            Country
          </label>
          <input
            name="Country"
            placeholder="Enter Country"
            type="text"
            ref={register({ required: true })}
            className="shippingView__form__input"
            id="country"
          />

          <div className="shippingView__form__buttons">
            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => history.push("/cart")}
            >
              Back to Cart
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="registerUserView__form__submit"
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              // onClick={() => history.push("/shipping/delivery")}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ShippingView;
