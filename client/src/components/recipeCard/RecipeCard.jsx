import React from "react";
import { Link } from "react-router-dom";
import s from "./RecipeCard.module.css";

export default function RecipeCard({ image, name, diet, id }) {
  return (
    <div className={s.card}>
      <Link to={"/home/" + id}>
        <img src={image} alt="" width="200px" className={s.img} />
        <h3 className={s.name}>{name[0].toUpperCase() + name.slice(1)}</h3>
        {diet?.map((d) => (
          <span className={s.types} key={d}>
            {d[0].toUpperCase() + d.slice(1)}
          </span>
        ))}
      </Link>
    </div>
  );
}
