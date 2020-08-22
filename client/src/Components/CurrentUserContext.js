import React from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [firstTimeModalVisible, setFirstTimeModalVisible] = React.useState(
    false
  );

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        firstTimeModalVisible,
        setFirstTimeModalVisible,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
