import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/recipes");
      console.log("act", json.data);
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRecipeName = (name) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );

      return dispatch({
        type: "GET_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRecipeId = (id) => {
  console.log("detailss", id);
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/recipes/${id}`);
      console.log("detail", json.data);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDietTypes = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_DIET_TYPES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRecipe = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/recipe",
        payload
      );
      return dispatch({ type: "POST_RECIPE", payload: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deteteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const json = await axios.delete(
        `http://localhost:3001/recipes/delete/${id}`
      );
      return dispatch({ type: "DELETE_RECIPE", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanRecipes = () => {
  return {
    type: "GET_RECIPES",
    payload: [],
  };
};

export const cleanDetail = () => {
  return {
    type: "GET_DETAILS",
    payload: [],
  };
};

export const filterByType = (payload) => {
  return {
    type: "FILTER_TYPES",
    payload,
  };
};

export const orderByName = (payload) => ({
  type: "ORDER_BY_NAME",
  payload,
});

export const orderByScore = (payload) => ({
  type: "ORDER_BY_SCORE",
  payload,
});
