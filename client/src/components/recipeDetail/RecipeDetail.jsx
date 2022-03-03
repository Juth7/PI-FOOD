import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeId, cleanDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image, name, diet, summary, score, healthScore, instructions } =
    useSelector((state) => state.detail);

  useEffect(() => {
    console.log(id);
    dispatch(getRecipeId(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  return (
    <div>
      <NavBar />
      <div>
        <h3>{name}</h3>
        <img src={image} alt="Img Not Found" />
        <p dangerouslySetInnerHTML={{ __html: `${summary}` }} />
        <div>
          {diet?.map((d) => (
            <h4 key={d}>{d}</h4>
          ))}
        </div>
        <div>
          <div>
            {" "}
            Score: <progress id="score" max="100" value={score} /> {score}/100
          </div>
          <div>
            {" "}
            Health Level:{" "}
            <progress id="healthScore" max="100" value={healthScore} />{" "}
            {healthScore}/100
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: `${instructions}` }} />
      </div>
    </div>
  );
}
