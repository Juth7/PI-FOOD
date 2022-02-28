import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:3001/recipes").then((json) =>
        dispatch({
          type: "GET_RECIPES",
          payload: json.data,
          loading: false,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRecipeName = (name) => {
  return async (dispatch) => {
    try {
      await axios.get(`http://localhost:3001/recipes?name=${name}`).then(
        (json) => console.log(json),
        dispatch({
          type: "GET_NAME",
          payload: json.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRecipeId = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`http://localhost:3001/recipes/${id}`).then((json) =>
        dispatch({
          type: "GET_DETAILS",
          payload: json.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDietTypes = () => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:3001/types").then(
        async (json) =>
          await dispatch({
            type: "GET_DIET_TYPES",
            payload: json.data,
          })
      );
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

export const orderByHealthScore = (payload) => ({
  type: "ORDER_BY_HEALTHSCORE",
  payload,
});
