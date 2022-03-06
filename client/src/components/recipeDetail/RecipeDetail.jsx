import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeId, cleanDetail, deleteRecipe } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import s from "./RecipeDetail.module.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    image,
    name,
    diet,
    summary,
    score,
    healthScore,
    instructions,
    createdByUser,
  } = useSelector((state) => state.detail);

  useEffect(() => {
    console.log(id);
    dispatch(getRecipeId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to delete your recipe?"
    );
    if (confirmation) {
      dispatch(deleteRecipe(id));
      alert("Recipe Deleted Successfully");
      navigate("/home");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={s.content}>
        <h3 className={s.title}>{name}</h3>
        <img
          src={image}
          alt="Img Not Available"
          width="500px"
          className={s.img}
        />
        <div className={s.summary}>
          <p dangerouslySetInnerHTML={{ __html: `${summary}` }} />
        </div>
        <div className={s.types}>
          {diet?.map((d) => (
            <h4 key={d}>{d}</h4>
          ))}
        </div>
        <div className={s.scores}>
          <div id="score">
            {" "}
            Score:{" "}
            <progress
              id="score"
              max="100"
              value={score}
              className={s.score}
            />{" "}
            {score}/100
          </div>
          <div id="healthScore">
            {" "}
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={healthScore}
              className={s.score}
            />{" "}
            {healthScore}/100
          </div>
        </div>
        <div className={s.instructions}>
          <p dangerouslySetInnerHTML={{ __html: `${instructions}` }} />
        </div>
        {createdByUser && (
          <button className={s.btnDelete} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
