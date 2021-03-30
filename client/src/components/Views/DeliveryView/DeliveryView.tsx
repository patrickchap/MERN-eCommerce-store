import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./DeliveryView.css";

interface props {
  ShippingFlow: React.FC<{}>;
}

type Inputs = {};

const DeliveryView: React.FC<props> = ({ ShippingFlow }) => {
  const history = useHistory();

  const onSubmit = (e: Inputs) => {
    console.log(e);
  };

  const { register, handleSubmit, errors } = useForm<Inputs>();
  return (
    <div className="deliveryView">
      <div className="deliveryView__container">
        <div className="deliveryView__shippingFlow">
          <ShippingFlow />
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)}>
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
              onClick={() => history.push("/shipping/review")}
            >
              Continue to Review
            </Button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default DeliveryView;
