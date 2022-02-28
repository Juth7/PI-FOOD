import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import RecipeDetail from "./components/pokemonDetail/RecipeDetail";
import CreateRecipe from "./components/createPokemon/CreateRecipe";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={RecipeDetail} />
      <Route exact path="/create" component={CreateRecipe} />
    </div>
  );
}

export default App;
