import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Publish = () => {
  let history = useHistory();
  const token = Cookies.get("userToken");
  console.log(token);
  const [file, setFile] = useState();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert("Onsubmit");
  };

  return token ? (
    <section id="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="field-container">
            <input
              type="file"
              onChange={(event) => {
                // console.log(event.target.files);
                setFile(event.target.files[0]);
              }}
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </section>
  ) : (
    history.push("/login")
  );
};

export default Publish;
