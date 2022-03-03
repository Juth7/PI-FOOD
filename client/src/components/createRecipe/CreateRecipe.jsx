import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateRecipe() {
  const dispatch = useDispatch();

  return (
    <div>
      <NavBar />
      <div>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={input.name.trim().toLowerCase()}
            autoComplete="off"
            required
            maxLength="20"
          />
        </form>
      </div>
    </div>
  );
}
