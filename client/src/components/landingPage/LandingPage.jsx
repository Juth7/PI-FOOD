import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.landing}>
      <Link to="/home">
        <button className={s.btnLanding}>WELCOME</button>
      </Link>
    </div>
  );
}
