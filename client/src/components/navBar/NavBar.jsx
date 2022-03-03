import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Cheffondo.png";
import logoHome from "../../img/logoHome.png";

export default function () {
  return (
    <div>
      <Link to="/">
        <button>
          <img src={logo} alt="Start" width="55px" />
        </button>
      </Link>
      <Link to="/home">
        <img src={logoHome} alt="Home" width="55px" />
      </Link>
    </div>
  );
}
