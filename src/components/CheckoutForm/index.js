import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./index.css";

const CheckoutForm = ({
  product_price,
  product_name,
  buyer_protection,
  shipping,
}) => {
  const total = (product_price + buyer_protection + shipping).toFixed(2);
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [success, setSuccess] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
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
          total: total,
          product_name,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setSuccess(response.data);
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
            <h3>Détails de la commande: {product_name}</h3>
            <div className="purchase-details">
              <ul>
                <li>
                  <span>Commande</span>
                  <span>{product_price.toFixed(2)} €</span>
                </li>
                <li>
                  <span>Frais protection acheteurs</span>
                  <span>{buyer_protection.toFixed(2)} €</span>
                </li>
                <li>
                  <span>frais de port</span>
                  <span>{shipping.toFixed(2)} €</span>
                </li>
              </ul>
            </div>

            <div className="purchase-details">
              <ul>
                <li>
                  <span>Total</span>
                  <span>{total} €</span>
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit">Payer</button>
            </form>
          </div>
        </section>
      ) : (
        <section id="payment">
          <div className="container">
            <h1>Paiement réalisé avec succès !</h1>
            <p>
              Achat: {success.description}
              <br />
              Prix total: {(success.amount / 100).toFixed(2)}
            </p>
          </div>
        </section>
      )}
    </>
  );
};
export default CheckoutForm;
