import React from "react";
export const BasicResultsContext = React.createContext(null);

const BasicResultsProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = React.useState([]);

  return (
    <BasicResultsContext.Provider value={{ recipeResults, setRecipeResults }}>
      {children}
    </BasicResultsContext.Provider>
  );
};

export default BasicResultsProvider;
