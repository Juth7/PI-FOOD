import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import RecipeDetail from "./components/recipeDetail/RecipeDetail";
import CreateRecipe from "./components/createRecipe/CreateRecipe";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<RecipeDetail />} />
        <Route path="/create" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}
