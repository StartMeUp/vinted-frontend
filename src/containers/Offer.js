import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <>
      <div className="container">
        <img src={offer.product_image.secure_url} alt="" />
        <div className="offer-details">
          <p>{offer.product_price}</p>
          <ul>
            {offer.product_details.map((detail, index) => {
              const entry = Object.entries(detail).flat();
              return (
                <li key={index}>
                  {entry[0]} : {entry[1]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Offer;
