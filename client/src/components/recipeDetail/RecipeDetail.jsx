import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeId, cleanDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import s from "./RecipeDetail.module.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image, name, diet, summary, score, healthScore, instructions } =
    useSelector((state) => state.detail);

  useEffect(() => {
    // console.log(id);
    dispatch(getRecipeId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

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
          <p>{summary && summary.replace(/<[^>]+>/g, "")}</p>
        </div>
        <div className={s.types}>
          {diet?.map((d) => (
            <h4 key={d}>{d}</h4>
          ))}
        </div>
        <div className={s.scores}>
          <span id="score">
            Score:{" "}
            <progress id="score" max="100" value={score} className={s.score} />{" "}
            {score}/100
          </span>
          <span id="healthScore">
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={healthScore}
              className={s.score}
            />{" "}
            {healthScore}/100
          </span>
        </div>
        <div className={s.instructions}>
          {instructions && (
            <p dangerouslySetInnerHTML={{ __html: `${instructions}` }} />
          )}
        </div>
      </div>
    </div>
  );
}
