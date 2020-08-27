// import React, { useContext } from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import styled from "styled-components";

// import { CurrentUserContext } from "./CurrentUserContext";

// const Heart = ({ id }) => {
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

//   const [toggleHeart, setToggleHeart] = React.useState(false);

//   React.useEffect(() => {
//     if (currentUser.favorites.includes(id)) {
//       setToggleHeart(true);
//     } else {
//       setToggleHeart(false);
//     }
//   }, [currentUser.favorites]);

//   return (
//     <div>
//       {!toggleHeart ? (
//         <FavoriteIt
//           onClick={(event) => {
//             event.preventDefault();
//             event.stopPropagation();

//             fetch("/addfavorite", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 recipeId: id,
//                 userId: currentUser._id,
//               }),
//             })
//               .then((res) => {
//                 return res.json();
//               })
//               .then((data) => {
//                 console.log("favourites response", data);
//                 setCurrentUser({
//                   ...currentUser,
//                   favorites: data,
//                 });
//                 setToggleHeart(true);
//                 //
//                 // if toggledheart is true, display icon vs other
//               });
//           }}
//         >
//           <AiOutlineHeart />
//         </FavoriteIt>
//       ) : (
//         <UnfavoriteIt
//           onClick={(event) => {
//             event.preventDefault();
//             event.stopPropagation();

//             fetch("/removefavorite", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 recipeId: id,
//                 userId: currentUser._id,
//               }),
//             })
//               .then((res) => {
//                 return res.json();
//               })
//               .then((data) => {
//                 setCurrentUser({
//                   ...currentUser,
//                   favorites: data,
//                 });
//                 setToggleHeart(false);
//               });
//           }}
//         >
//           <AiFillHeart color="red" />
//         </UnfavoriteIt>
//       )}
//     </div>
//   );
// };

// const FavoriteIt = styled.button`
//   background-color: white;
//   margin-right: 5px;
//   padding-top: 3px;
//   cursor: pointer;
//   &:active {
//     outline: none;
//   }
//   &:focus {
//     outline: none;
//   }
//   &:active {
//     transform: translateY(2px);
//     outline: none;
//   }
// `;

// const UnfavoriteIt = styled.button`
//   background-color: white;
//   margin-right: 5px;
//   padding-top: 3px;
//   cursor: pointer;
//   &:active {
//     outline: none;
//   }
//   &:focus {
//     outline: none;
//   }
//   &:active {
//     transform: translateY(2px);
//     outline: none;
//   }
// `;

// export default Heart;
