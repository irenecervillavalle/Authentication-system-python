import { Button } from "@material-ui/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");

  const logout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div style={{ display: "flex", gap: "15px" }} className="ml-auto">
          {!token ? (
            <>
              <Link to="/register">
                <Button variant="contained" color="secondary">
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={logout}>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
