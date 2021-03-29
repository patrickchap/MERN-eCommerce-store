import Button from "@material-ui/core/Button";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import "./ShippingView.css";
import { rootStore } from "../../../RootStore";

type Inputs = {
  Address: string;
  City: string;
  PostalCode: number;
  Country: string;
};

const ShippingView: React.FC = observer(() => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const root = useContext(rootStore);
  const { updateShippingDetail, shippingDetail } = root.CartStore;

  const onSubmit = (e: Inputs) => {
    updateShippingDetail(e);
  };

  return (
    <div className="shippingView">
      <div className="shippingView__container">
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

          <Button
            type="submit"
            variant="contained"
            className="registerUserView__form__submit"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
});

export default ShippingView;
