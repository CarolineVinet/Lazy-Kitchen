import React from "react";
export const LazyContext = React.createContext(null);

const LazyProvider = ({ children }) => {
  const [lazyFilter, setLazyFilter] = React.useState("neutral");

  return (
    <LazyContext.Provider value={{ lazyFilter, setLazyFilter }}>
      {children}
    </LazyContext.Provider>
  );
};

export default LazyProvider;
