import React, {
  useState, useContext, createContext, useMemo,
} from 'react';

const Recipe = createContext(null);
export const useRecipe = () => useContext(Recipe);

export default function RecipeProvider({ children }) {
  const [toggleRecipe, setToggleRecipe] = useState(null);

  const saveToggleRecipe = (data) => {
    setToggleRecipe(data);
  };

  const recipeDataValue = useMemo(() => (
    { toggleRecipe }), [toggleRecipe]);

  return (
    <Recipe.Provider value={{ ...recipeDataValue, saveToggleRecipe }}>
      {children}
    </Recipe.Provider>
  );
}
