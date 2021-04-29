import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../RootStore";
import "./CheckoutForm.css";

interface billingDetails {
  name: string;
  email: string;
  address: { city: string; line1: string; state: string; postal_code: number };
}

export default observer(function CheckoutForm() {
  const root = useContext(rootStore);
  const { userInfo } = root.UserStore;
  const { shippingDetail, cartItems, shippingAndHandling } = root.CartStore;

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState(userInfo?.name ? userInfo.name : "");
  const stripe = useStripe();
  const elements = useElements();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    // Create PaymentIntent
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          shipping: shippingAndHandling,
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret);
      });
  }, [cartItems, shippingAndHandling]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  console.log(shippingDetail.Country);
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);

    const billingDetails = {
      address: {
        city: shippingDetail.City,
        // country: shippingDetail.Country,
        line1: shippingDetail.Address,
        postal_code: String(shippingDetail.PostalCode),
        state: "UT",
      },

      email: userInfo?.email,
      name: name,
    };

    let card = elements?.getElement(CardElement);

    if (card) {
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: card,
        billing_details: billingDetails,
      });

      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.paymentMethod?.id,
      });

      if (payload !== undefined && payload.error) {
        let errorMessage = `Payment failed ${payload.error.message}`;
        setError(errorMessage);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        disabled={processing || disabled || succeeded}
        id="payment-submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          Stripe dashboard.
        </a>
        Refresh the page to pay again.
      </p>
    </form>
  );
});
