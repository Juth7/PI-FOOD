import React from "react";
import { Link } from "react-router-dom";
// import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <Link to="/home">
        <button>ENTER</button>
      </Link>
    </div>
  );
}
