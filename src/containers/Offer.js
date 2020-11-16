import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DummyAvatar from "../assets/images/dummy-avatar.jpg";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://vinted-back-smu.herokuapp.com/offer/${id}`;
        const response = await axios.get(url);

        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <section className="container loader">
      <div className="lds-dual-ring"></div>
    </section>
  ) : (
    <section id="offer">
      <div className="container">
        <img src={offer.product_image.secure_url} alt="" />
        <div className="offer-details">
          <p className="offer-price">{offer.product_price} €</p>
          <ul>
            {offer.product_details.map((detail, index) => {
              const entry = Object.entries(detail).flat();
              return (
                <li key={index}>
                  <span className="details-key">{entry[0]}</span>
                  <span className="details-value">{entry[1]}</span>
                </li>
              );
            })}
          </ul>
          <hr />
          <p>
            <span className="offer-name">{offer.product_name}</span>
            <br />
            <br />
            {offer.product_description}
          </p>
          <div className="offer-owner">
            <img
              src={
                offer.owner.account.avatar
                  ? offer.owner.account.avatar.secure_url
                  : DummyAvatar
              }
              alt=""
            />
            {offer.owner.account.username}
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </section>
  );
};

export default Offer;
