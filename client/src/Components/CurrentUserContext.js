import React from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
