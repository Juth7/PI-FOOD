import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ image, name, diet, id }) {
  return (
    <div>
      <Link to={"/home/" + id}>
        <img src={image} alt="" />
        <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
        {diet?.map((d) => (
          <span key={d}>{d[0].toUpperCase() + d.slice(1)}</span>
        ))}
      </Link>
    </div>
  );
}
