import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const DietModal = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dietList, setDietList] = React.useState([]);
  const [allergyList, setAllergyList] = React.useState([]);
  const [avoidList, setAvoidList] = React.useState("");

  const dietListOnChange = (dietType) => {
    if (!dietList.includes(dietType)) {
      setDietList([...dietList, dietType]);
    } else {
      const index = dietList.findIndex((item) => item === dietType);
      delete dietList[index];
      console.log(dietList);
    }
  };

  const allergyListOnChange = (allergy) => {
    if (!allergyList.includes(allergy)) {
      setAllergyList([...allergyList, allergy]);
    } else {
      const index = allergyList.findIndex((item) => item === allergy);
      delete allergyList[index];
      console.log(allergyList);
    }
  };

  return (
    <Body>
      <form>
        <div>
          Diet
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("vegetarian");
              }}
              type="radio"
              name="diet"
            ></input>
            Vegetarian
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("vegan");
              }}
              type="radio"
              name="diet"
            ></input>
            Vegan
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("ovo vegetarian");
              }}
              type="radio"
              name="diet"
            ></input>
            Ovo-Vegetarian
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("lacto vegetarian");
              }}
              type="radio"
              name="diet"
            ></input>
            Lacto-Vegetarian
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("pescetarian");
              }}
              type="radio"
              name="diet"
            ></input>
            Pescetarian
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                dietListOnChange("");
              }}
              type="radio"
              name="diet"
            ></input>
            None
          </CheckItem>
        </div>

        <div>
          Allergies/Intolerances
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("dairy");
              }}
              type="checkbox"
            ></input>
            Dairy
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("egg");
              }}
              type="checkbox"
            ></input>
            Egg
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("gluten");
              }}
              type="checkbox"
            ></input>
            Gluten
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("wheat");
              }}
              type="checkbox"
            ></input>
            Wheat
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("shellfish");
              }}
              type="checkbox"
            ></input>
            Shellfish
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("peanuts");
              }}
              type="checkbox"
            ></input>
            Peanuts
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("nuts");
              }}
              type="checkbox"
            ></input>
            Nuts
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("soy");
              }}
              type="checkbox"
            ></input>
            Soy
          </CheckItem>
          <CheckItem>
            <input
              onChange={() => {
                allergyListOnChange("sesame");
              }}
              type="checkbox"
            ></input>
            Sesame
          </CheckItem>
        </div>

        <div>
          Ingredients to avoid
          <input
            onChange={(event) => {
              setAvoidList(event.target.value);
            }}
            type="text"
            placeholder="ex: cilantro, mushrooms, etc"
          ></input>
        </div>

        <button
          onClick={(event) => {
            event.preventDefault();

            fetch("/updateuser", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: currentUser._id,
                allergies: allergyList,
                diet: dietList,
                avoid: avoidList,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log("dietary restrictions result line 212 :: ", data);
                setCurrentUser({
                  ...currentUser,
                  allergies: data.allergies,
                  diet: data.diet,
                  avoid: data.avoid,
                });
              });
          }}
        >
          Save
        </button>
      </form>
    </Body>
  );
};

const Body = styled.div`
  border: red solid 2px;
  margin: 15px;
  width: 50%;
`;

const CheckItem = styled.div``;

export default DietModal;
