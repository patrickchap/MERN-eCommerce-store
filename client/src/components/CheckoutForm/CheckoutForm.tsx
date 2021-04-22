import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { ConfirmCardPaymentData, StripeElements } from "@stripe/stripe-js";
import "./CheckoutForm.css";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
    console.log("clientSecret");
    // console.log(clientSecret);
  }, []);

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

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);

    const billingDetails = {
      name: "TestBilling Name",
      email: "email@email.com",
      address: {
        city: "Salt Lake City",
        line1: "427 Westminster Ave",
        state: "UT",
        postal_code: "84115",
      },
    };

    let card = elements?.getElement(CardElement);

    if (card) {
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: card,
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
      <input type="text" placeholder="Name" />
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
}
