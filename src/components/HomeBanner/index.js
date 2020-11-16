import React from "react";
import "./index.css";
import Tear from "../../assets/images/tear.svg";

const HomeBanner = () => {
  return (
    <section id="banner">
      <div className="container">
        <div id="hero">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <img src={Tear} alt="" className="tear" />
    </section>
  );
};

export default HomeBanner;
