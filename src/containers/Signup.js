import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-back-smu.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("un truc étrange s'est passé !");
      }
    } catch (error) {
      console.log(error.message);
      alert("Une erreur est survenue, recommencez");
    }
  };

  return (
    <div className="container" id="form">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          required
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="email"
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Signup;
