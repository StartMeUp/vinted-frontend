import React, { useState } from "react";
import Cookies from "js-cookie";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Publish = () => {
  let history = useHistory();
  const token = Cookies.get("userToken");

  // states
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [etat, setEtat] = useState("");
  const [couleur, setCouleur] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState();

  // form submit
  const handleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      // formdata
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("description", product_description);
      formData.append("price", price);
      formData.append("condition", etat);
      formData.append("city", emplacement);
      formData.append("brand", marque);
      formData.append("size", taille);
      formData.append("color", couleur);

      const response = await axios.post(
        "https://vinted-back-smu.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: "Bearer " + token } }
      );
      console.log(response);
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  // render view
  return token ? (
    <section id="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="field-container image-field">
            <input
              type="file"
              onChange={(event) => {
                // console.log(event.target.files);
                setFile(event.target.files[0]);
              }}
            />
          </div>
          <div className="field-container">
            <div>
              <label htmlFor="product_name">Titre</label>
              <input
                type="text"
                name="product_name"
                value={product_name}
                placeholder="ex: chemise Zara blanche, taille 38 peu portée"
                onChange={(event) => {
                  setProduct_name(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="product_description">Description</label>
              <textarea
                rows="5"
                name="product_description"
                value={product_description}
                placeholder="ex: une petite description ici"
                onChange={(event) => {
                  setProduct_description(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="field-container">
            <div>
              <label htmlFor="marque">Marque</label>
              <input
                type="text"
                name="marque"
                value={marque}
                placeholder="ex: Nike"
                onChange={(event) => {
                  setMarque(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="taille">Taille</label>
              <input
                type="text"
                name="taille"
                value={taille}
                placeholder="ex: 34 ou M"
                onChange={(event) => {
                  setTaille(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="couleur">Couleur</label>
              <input
                type="text"
                name="couleur"
                value={couleur}
                placeholder="ex: purple"
                onChange={(event) => {
                  setCouleur(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="etat">Etat</label>
              <input
                type="text"
                name="etat"
                value={etat}
                placeholder="ex: peu porté"
                onChange={(event) => {
                  setEtat(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="emplacement">Emplacement</label>
              <input
                type="text"
                name="emplacement"
                value={emplacement}
                placeholder="ex: Le port du Havre (seul·e·s les vrai·e·s savent)"
                onChange={(event) => {
                  setEmplacement(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="field-container">
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="ex: 25"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>

          <button type="submit">Ajouter</button>
        </form>
      </div>
    </section>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
