import React from "react";
import { observer } from "mobx-react-lite";
import "./PaymentView.css";
import OrderSummary from "../../OrderSumary/OrderSummary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";

interface props {
  ShippingFlow: React.FC<{}>;
}

declare var process: {
  env: {
    REACT_APP_STRIPE_KEY: string;
  };
};

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentView: React.FC<props> = observer(({ ShippingFlow }) => {
  return (
    <div className="paymentView">
      <div
        className="paymentView__container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="paymentView__left" style={{ flex: 0.6 }}>
          <div className="paymentView__shippingFlow">
            <ShippingFlow />
          </div>
          <div className="paymentView__form__body">
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>

        <div className="paymentView__right" style={{ flex: 0.3 }}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
});

export default PaymentView;
