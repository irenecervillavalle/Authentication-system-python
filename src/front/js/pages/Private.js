import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {

	const token = sessionStorage.getItem('access_token')

	if (!token) {
		return <Navigate to="/login" />
	}

  return (
    <div className="jumbotron">
      <h1 className="display-4">This will show the demo element</h1>
      <img src={rigoImageUrl} />
      <hr className="my-4" />

      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
