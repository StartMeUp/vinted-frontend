import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./index.css";

const CheckoutForm = ({ product_price, product_name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        product_price,
        product_name,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://vinted-back-smu.herokuapp.com/payment",
        {
          stripeToken,
          product_price,
          product_name,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      {!completed ? (
        <section id="payment">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit">Valider</button>
            </form>
          </div>
        </section>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};
export default CheckoutForm;
