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
      <Wrapper>
        <DietDiv>
          <Category> Diet</Category>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("vegetarian");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            Vegetarian
          </CheckItem>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("vegan");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            Vegan
          </CheckItem>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("ovo vegetarian");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            Ovo-Vegetarian
          </CheckItem>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("lacto vegetarian");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            Lacto-Vegetarian
          </CheckItem>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("pescetarian");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            Pescetarian
          </CheckItem>
          <CheckItem>
            <RadioInput
              onChange={() => {
                dietListOnChange("");
              }}
              type="radio"
              name="diet"
            ></RadioInput>{" "}
            None
          </CheckItem>
        </DietDiv>

        <AllergyDiv>
          <Category> Allergies/Intolerances</Category>
          <DivC>
            <DivA>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("dairy");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Dairy
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("egg");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Egg
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("gluten");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Gluten
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("wheat");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Wheat
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("shellfish");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Shellfish
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("peanuts");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Peanuts
              </CheckItem>
            </DivA>
            <DivB>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("nuts");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Nuts
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("soy");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Soy
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("sesame");
                  }}
                  type="checkbox"
                ></RadioInput>{" "}
                Sesame
              </CheckItem>
            </DivB>
          </DivC>
        </AllergyDiv>
      </Wrapper>

      <AvoidDiv>
        <InputDiv>
          <Text>Ingredients to avoid</Text>
          <Input
            onChange={(event) => {
              setAvoidList(event.target.value);
            }}
            type="text"
            placeholder="ex: cilantro, mushrooms, etc"
          ></Input>
        </InputDiv>

        <Save
          onClick={(event) => {
            event.preventDefault();

            //DISPLAY SPINNER///

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
                //SET SELECTIONS TO NULL//
                //DISPLAY CONFIRMATION MESSAGE

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
        </Save>
      </AvoidDiv>
    </Body>
  );
};

const Body = styled.div`
  box-shadow: 1px 1px 10px #808080ab;
  border-radius: 8px;
  margin: 15px;
  width: 26%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Category = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-top: -10px;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

const DietDiv = styled.div`
  padding: 10px;
  line-height: 2;
  margin-top: 20px;
`;
const AllergyDiv = styled.div`
  padding: 10px;
  border-left: 1px #80808045 solid;
  line-height: 2;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const DivA = styled.div``;

const DivB = styled.div``;

const DivC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AvoidDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: left;
  margin-top: 5px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-bottom: 5px;
`;

const Text = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const Input = styled.input`
  border: 1px solid #00000036;
  margin: 5px;
  font-style: italic;
  padding-left: 3px;
  border-radius: 5px;
  height: 30px;
  width: 260px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

const Save = styled.button`
  padding-top: 25px;
  padding-left: 45px;
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const CheckItem = styled.div``;

export default DietModal;
