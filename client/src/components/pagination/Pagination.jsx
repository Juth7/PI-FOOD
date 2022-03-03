import React from "react";
import s from "./Pagination.module.css";

export default function Pagination({
  recipesPerPage,
  totalRecipes,
  pagination,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    //math.ceil(totalpages)
    pages.push(i);
  }

  return (
    <div>
      {pages?.map((e) => (
        <button className={s.pagination} key={e} onClick={() => pagination(e)}>
          {e}
        </button>
      ))}
    </div>
  );
}
