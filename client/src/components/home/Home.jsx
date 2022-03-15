import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import s from "./Home.module.css";
import loader from "../../img/loader.gif";
import icon from "../../img/refresh.jpg";
import notFound from "../../img/notFound.png";
import Pagination from "../pagination/Pagination";
import RecipeCard from "../recipeCard/RecipeCard";
import {
  getRecipes,
  getRecipeName,
  getDietTypes,
  orderByScore,
  orderByName,
  filterByType,
} from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.showedRecipes);
  const diets = useSelector((state) => state.diets);
  const isLoading = useSelector((state) => state.isLoading);
  const [name, setName] = useState("");
  const [, setOrder] = useState("");

  // ------------ PAGINATION --------------
  const [page, setPage] = useState(1);
  const recipesPerPage = 9;
  const end = page * recipesPerPage; //index of the last recipe
  const start = end - recipesPerPage; //index of the first recipe
  const currentRecipes = recipes?.slice(start, end); //rango de recetas en que estamos
  // console.log("current", currentRecipes);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDietTypes());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeName(name));
    setPage(1);
  };

  const filterTypes = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setPage(1);
  };
  const orderNames = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by name: ${e.target.value}`);
    setPage(1);
  };
  const orderScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setOrder(`Order by score: ${e.target.value}`);
    setPage(1);
  };

  return (
    <div>
      <NavBar />
      <div className={s.home}>
        {isLoading ? (
          <img src={loader} alt="Loading..." className={s.loader} />
        ) : typeof currentRecipes[0] === "object" ? (
          <div className={s.cards}>
            {currentRecipes?.map((r) => (
              <RecipeCard
                key={r.id}
                image={r.image}
                name={r.name}
                diet={r.diet}
                id={r.id}
              />
            ))}
          </div>
        ) : (
          <div className={s.notFound}>
            <img
              src={notFound}
              alt="Recipe Not Found"
              width="800px"
              height="400px"
            />
          </div>
        )}
        <div className={s.filters}>
          <button className={s.btnReload} onClick={handleClick}>
            <img src={icon} alt="Reload" width="27px" />
          </button>
          <div>
            <form onClick={handleSubmit}>
              <input
                className={s.search}
                type="text"
                placeholder="  Write a name here..."
                onChange={handleInput}
              />
              <button type="submit" className={s.btnSearch}>
                Search
              </button>
            </form>
          </div>
          <select onChange={filterTypes} className={s.select}>
            <option value="all">Filter By Diets</option>
            {diets?.map((d) => (
              <option key={d.name} value={d.name}>
                {" "}
                {d.name[0].toUpperCase() + d.name.slice(1)}
              </option>
            ))}
          </select>
          <select onChange={orderNames} className={s.select}>
            <option value="all">Order By Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={orderScore} className={s.select}>
            <option value="all">Order By Score</option>
            <option value="high">Highest Score</option>
            <option value="low">Lowest Score</option>
          </select>
          <Link to="/create">
            <button className={s.btnCreate}>Create Your Recipe!</button>
          </Link>
        </div>
      </div>
      <Pagination
        className={s.pagination}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
