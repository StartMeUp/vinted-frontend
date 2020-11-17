import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  const location = useLocation().state;
  const { product_name, product_price } = location;

  const stripePromise = loadStripe("pk_test_7m4HAtFNrGCwdWdVCMLiktxt");

  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        product_name={product_name}
        product_price={product_price}
        buyer_protection={0.4}
        shipping={5}
      />
    </Elements>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payment;
