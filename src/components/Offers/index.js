import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://vinted-back-smu.herokuapp.com/offers"
      );
      setOffers(response.data.offers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <p>Loading data</p>
  ) : (
    <section id="content">
      <div className="container">
        {offers.map((offer) => {
          return (
            <Link to={`offer/${offer._id}`}>
              <div className="offer-card">
                <div className="owner">
                  <img src={offer.owner.account.avatar.secure_url} alt="" />
                  {offer.owner.account.username}
                </div>
                <img
                  className="offer-image"
                  src={offer.product_image.secure_url}
                  alt=""
                />
                <div className="info">
                  <span className="price">{offer.product_price} €</span>
                  <br />
                  <span className="size">
                    {offer.product_details[1].TAILLE}
                  </span>
                  <br />
                  <span className="brand">
                    {offer.product_details[0].MARQUE}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Offers;
