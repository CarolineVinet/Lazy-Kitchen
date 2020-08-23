import React from "react";
export const ReviewsContext = React.createContext(null);

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    fetch("/getallreviews", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
