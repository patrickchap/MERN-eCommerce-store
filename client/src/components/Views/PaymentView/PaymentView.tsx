import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../RootStore";
import "./PaymentView.css";

interface props {
  ShippingFlow: React.FC<{}>;
}

const PaymentView: React.FC<props> = observer(({ ShippingFlow }) => {
  return (
    <div className="paymentView">
      <div className="paymentView__container">
        <div className="paymentView__shippingFlow">
          <ShippingFlow />
        </div>
        <div className="paymentView__form__body">
          <label htmlFor="name" className="paymentView__label">
            Name on Card
          </label>
          <input
            name="name"
            placeholder="Enter Name"
            type="text"
            // ref={register({ required: true })}
            className="paymentView__form__input"
            id="name"
            // value={address}
            // onChange={(e) => handleAddressChange(e)}
          />

          <label htmlFor="cardNumber" className="paymentView__label">
            Card Number
          </label>
          <input
            name="cardNumber"
            placeholder="1234 1234 1234 1234"
            type="text"
            // ref={register({ required: true })}
            className="paymentView__form__input"
            id="cardNumber"
            // value={address}
            // onChange={(e) => handleAddressChange(e)}
          />

          <div className="paymentView--bottomLine">
            <div className="paymentView--bottomLine__section">
              <label htmlFor="expireDate" className="paymentView__label">
                Expiration date
              </label>
              <input
                name="expireDate"
                placeholder="MM/YY"
                type="text"
                // ref={register({ required: true })}
                className="paymentView__form__input"
                id="cardNumber"
                // value={address}
                // onChange={(e) => handleAddressChange(e)}
              />
            </div>

            <div className="paymentView--bottomLine__section">
              <label htmlFor="cvc" className="paymentView__label">
                CVC
              </label>
              <input
                name="cvc"
                placeholder="CVC"
                type="text"
                // ref={register({ required: true })}
                className="paymentView__form__input"
                id="cvc"
                // value={address}
                // onChange={(e) => handleAddressChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PaymentView;
