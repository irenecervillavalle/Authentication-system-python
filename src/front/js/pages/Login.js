import React from "react";
import "../../styles/register.css";
import { Button, Card, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch(`${process.env.BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
        sessionStorage.setItem("access_token", data.access_token);
        window.location = "/private";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cont-principal">
      <Card
        style={{
          width: "300px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2>Login</h2>
        <form autoComplete="off" className="form-register" onSubmit={onSubmit}>
          <TextField id="standard-basic" label="Email" name="email" />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            name="password"
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
