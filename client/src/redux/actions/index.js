import axios from "axios";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        "https://food-app-juth.herokuapp.com/recipes"
      );
      // console.log("act", json.data);
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
        `https://food-app-juth.herokuapp.com/recipes?name=${name}`
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
  // console.log("detailss", id);
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `https://food-app-juth.herokuapp.com/recipes/${id}`
      );
      // console.log("detail", json.data);
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
      const json = await axios.get("https://food-app-juth.herokuapp.com/types");
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
        "https://food-app-juth.herokuapp.com/recipe",
        payload
      );
      return dispatch({ type: "POST_RECIPE", payload: response });
    } catch (error) {
      console.log(error);
    }
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
