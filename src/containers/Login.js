import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "https://vinted-back-smu.herokuapp.com/user/login",
      {
        email: "brando7@hotmail.com",
        password: "azerty",
      }
    );
    console.log(response.data);
    setUser(response.data.token);
    history.push("/");
  };
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <h1 style={{ fontSize: 50 }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <button type="submit">Send login request</button>
        </form>
      </div>
    </>
  );
};

export default Login;
