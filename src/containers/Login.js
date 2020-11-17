import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Login = ({ setUser }) => {
  const location = useLocation();
  let history = useHistory();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // functions to handle login form
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //brando7@hotmail.com
      console.log(email);
      console.log(password);
      const response = await axios.post(
        "https://vinted-back-smu.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      console.log("response.data =>", response.data);
      if (response.data.token) {
        setUser(response.data.token);
      } else {
        alert("Erreur, recommencez");
      }
    } catch (error) {
      alert("Erreur, recommencez");
      console.log(error.message);
    }
  };
  return (
    <section className="container" id="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Password"
        />
        <button type="submit">Se connecter</button>
      </form>
    </section>
  );
};

export default Login;
