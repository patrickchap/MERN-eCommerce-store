import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import "./ShippingView.css";
import { rootStore } from "../../../RootStore";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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

  const [address, setAddress] = useState(
    shippingDetail ? shippingDetail.Address : ""
  );

  const [city, setCity] = useState(shippingDetail ? shippingDetail.City : "");
  const [postalCode, setPostalCode] = useState(
    shippingDetail ? shippingDetail.PostalCode : ""
  );
  const [country, setCountry] = useState(
    shippingDetail ? shippingDetail.Country : ""
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

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
          {errors.Address && <Alert severity="error">Address Needed</Alert>}
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
            value={address}
            onChange={(e) => handleAddressChange(e)}
          />
          {errors.City && <Alert severity="error">City Needed</Alert>}

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
            value={city}
            onChange={(e) => handleCityChange(e)}
          />

          {errors.PostalCode && (
            <Alert severity="error">Postal Code Needed</Alert>
          )}

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
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e)}
          />
          {errors.Country && <Alert severity="error">Country Needed</Alert>}

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
            value={country}
            onChange={(e) => handleCountryChange(e)}
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
