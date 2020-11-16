import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-vinted-web.png";
import Search from "../../assets/images/search.svg";

const NavBar = ({ token, setUser }) => {
  return (
    <div className="container" id="nav">
      <Link to="/">
        <img src={Logo} alt="" id="logo" />
      </Link>
      <div className="search">
        <img src={Search} alt="" />
        <input type="text" placeholder="recherche" />
      </div>

      {token ? (
        <Link
          className="navbutton"
          onClick={() => {
            setUser(null);
            window.location.reload();
          }}
        >
          Déconnexion
        </Link>
      ) : (
        <>
          <Link to="/signup" className="navbutton">
            S'inscrire
          </Link>
          <Link to="/login" className="navbutton">
            Se connecter
          </Link>
        </>
      )}

      <Link to="/publish" className="navbutton">
        Vends tes articles
      </Link>
    </div>
  );
};

export default NavBar;
