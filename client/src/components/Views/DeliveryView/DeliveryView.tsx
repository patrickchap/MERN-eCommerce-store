import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import Alert from "@material-ui/lab/Alert";
import "./DeliveryView.css";
import OrderSummary from "../../OrderSumary/OrderSummary";

interface props {
  ShippingFlow: React.FC<{}>;
}

type Inputs = {
  delivery: string;
};

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addDays = (days: number) => {
  let today = new Date();
  let result = new Date();
  result.setDate(today.getDate() + days);
  return result;
};

const formatDate = (date: Date) => {
  return (
    days[Number(date.getDay())] +
    " " +
    month[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};

const DeliveryView: React.FC<props> = observer(({ ShippingFlow }) => {
  const history = useHistory();

  const onSubmit = (e: Inputs) => {
    console.log(e);
    history.push("/shipping/review");
  };

  const { register, handleSubmit, errors } = useForm<Inputs>();
  return (
    <div className="deliveryView">
      <div
        className="deliveryView__container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="deliveryView__left" style={{ flex: 0.6 }}>
          <div className="deliveryView__shippingFlow">
            <ShippingFlow />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.delivery && (
              <Alert severity="error">Delivery Option Needed</Alert>
            )}
            <div className="deliveryView__form__body">
              <div className="deliveryView__form__line">
                <div className="deliveryView__form__line--left">
                  <h3>Shipping</h3>
                </div>
                <h3>ESTIMATED ARRIVAL</h3>
              </div>

              <div className="deliveryView__form__line">
                <div className="deliveryView__form__line--left">
                  <input
                    type="radio"
                    name="delivery"
                    value="27.3"
                    ref={register({
                      required: true,
                    })}
                  />
                  <p>$27.30</p>
                </div>
                <p>{formatDate(addDays(14))}</p>
              </div>

              <div className="deliveryView__form__line">
                <div className="deliveryView__form__line--left">
                  <input
                    type="radio"
                    name="delivery"
                    value="16.3"
                    ref={register({
                      required: true,
                    })}
                  />
                  <p>$16.30</p>
                </div>

                <p>{formatDate(addDays(15))}</p>
              </div>

              <div className="deliveryView__form__line">
                <div className="deliveryView__form__line--left">
                  <input
                    type="radio"
                    name="delivery"
                    value="7.58"
                    ref={register({
                      required: true,
                    })}
                  />
                  <p>$7.58</p>
                </div>

                <div className="deliveryView__form__line--right--wrap">
                  <p>
                    {formatDate(addDays(17)) + " - " + formatDate(addDays(22))}
                  </p>
                </div>
              </div>
            </div>

            <div className="deliveryView__form__buttons">
              <Button
                type="button"
                variant="contained"
                className="registerUserView__form__submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() => history.push("/shipping/address")}
              >
                Back to Address
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="registerUserView__form__submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                }}
                //   onClick={() => history.push("/shipping/review")}
              >
                Continue to Review
              </Button>
            </div>
          </form>
        </div>

        <div className="deliveryView__right" style={{ flex: 0.3 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
});

export default DeliveryView;
