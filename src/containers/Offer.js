import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const id = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-back-smu.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setOffer(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [id]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="container">
      {console.log("offer =>", offer, isLoading)}
      <img src={offer.product_image.secure_url} alt="" />
      <div className="offer-details">
        <p>{offer.product_price}</p>
        <ul>
          {offer.product_details.map((detail) => {
            const values = Object.entries(detail);
            return (
              <li>
                {values[0][0]} : {values[0][1]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Offer;
