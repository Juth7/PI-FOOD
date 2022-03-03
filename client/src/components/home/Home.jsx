import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import s from "./Home.module.css";
import loader from "../../img/loader.gif";
import icon from "../../img/refresh.png";
import notFound from "../../img/notFound.jpg";
import Pagination from "../pagination/Pagination";
import RecipeCard from "../recipeCard/RecipeCard";
// import Loader from "../../img/Charizard.gif";
import {
  getRecipes,
  getRecipeName,
  getDietTypes,
  orderByScore,
  orderByName,
  filterByType,
  cleanRecipes,
} from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.showedRecipes);
  const diets = useSelector((state) => state.diets);
  const isLoading = useSelector((state) => state.isLoading);
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  // const [recipesPerPage, setRecipesPerPage] = useState(9);
  const recipesPerPage = 9;
  const end = page * recipesPerPage; //index of the last recipe
  const start = end - recipesPerPage; //index of the first recipe
  const currentRecipes = recipes?.slice(start, end); //rango de pokemones en que estamos

  const pagination = (n) => {
    setPage(n);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDietTypes());
    return () => {
      dispatch(cleanRecipes());
    };
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
    setName("");
  };

  const filterTypes = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setPage(1);
  };
  const orderNames = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPage(1);
    setOrder(`Order by name: ${e.target.value}`);
  };
  const orderScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setPage(1);
    setOrder(`Order by score: ${e.target.value}`);
  };

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <img src={loader} alt="Loading..." />
      ) : typeof currentRecipes[0] === "object" ? (
        <div>
          {currentRecipes.map((r) => (
            <RecipeCard
              key={r.name}
              image={r.image}
              name={r.name}
              diet={r.diet}
              id={r.id}
            />
          ))}
        </div>
      ) : (
        <div>
          <img src={notFound} alt="Recipe Not Found" width="450px" />
          <h3>Recipe Not Found </h3>
        </div>
      )}
      <div>
        <button className={s.btnReload} onClick={handleClick}>
          <img src={icon} alt="Reload" width="20px" />
        </button>
        <div>
          <form onClick={handleSubmit}>
            <input type="text" placeholder="Search..." onChange={handleInput} />
            <button type="submit">Search</button>
          </form>
        </div>
        <select onChange={filterTypes}>
          <option value="all">Filter By Diets</option>
          {diets?.map((d) => (
            <option key={d.name} value={d.name}>
              {" "}
              {d.name[0].toUpperCase() + d.name.slice(1)}
            </option>
          ))}
        </select>
        <select onChange={orderNames}>
          <option value="all">Order By Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onChange={orderScore}>
          <option value="all">Order By Score</option>
          <option value="high">Highest Score</option>
          <option value="low">Lowest Score</option>
        </select>
        <Link to="/create">
          <button>New Recipe</button>
        </Link>
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        pagination={pagination}
      />
    </div>
  );
}
