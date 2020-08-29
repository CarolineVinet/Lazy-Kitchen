import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const DietModal = ({ onCancel, setSavedVisible }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dietList, setDietList] = React.useState("");
  const [allergyList, setAllergyList] = React.useState([]);
  const [avoidList, setAvoidList] = React.useState("");

  React.useEffect(() => {
    if (currentUser.diet) {
      setDietList(currentUser.diet);
    }
  }, [currentUser.diet]);
  React.useEffect(() => {
    if (currentUser.allergies && currentUser.allergies.length > 0) {
      setAllergyList(currentUser.allergies);
    }
  }, [currentUser.allergies]);
  React.useEffect(() => {
    if (currentUser.avoid) {
      setAvoidList(currentUser.avoid);
    }
  }, [currentUser.avoid]);

  const dietListOnChange = (dietType) => {
    setDietList(dietType);
  };

  const allergyListOnChange = (allergy) => {
    if (!allergyList.includes(allergy)) {
      setAllergyList([...allergyList, allergy]);
    } else {
      const index = allergyList.findIndex((item) => item === allergy);
      delete allergyList[index];

      setAllergyList([...allergyList]);
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
              checked={dietList.includes("vegetarian")}
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
              checked={dietList.includes("vegan")}
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
              checked={dietList.includes("ovo vegetarian")}
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
              checked={dietList.includes("lacto vegetarian")}
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
              checked={dietList.includes("pescetarian")}
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
              checked={dietList.length === 0}
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
                  checked={allergyList.includes("dairy")}
                ></RadioInput>{" "}
                Dairy
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("egg");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("egg")}
                ></RadioInput>{" "}
                Egg
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("gluten");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("gluten")}
                ></RadioInput>{" "}
                Gluten
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("wheat");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("wheat")}
                ></RadioInput>{" "}
                Wheat
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("shellfish");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("shellfish")}
                ></RadioInput>{" "}
                Shellfish
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("peanuts");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("peanuts")}
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
                  checked={allergyList.includes("nuts")}
                ></RadioInput>{" "}
                Nuts
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("soy");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("soy")}
                ></RadioInput>{" "}
                Soy
              </CheckItem>
              <CheckItem>
                <RadioInput
                  onChange={() => {
                    allergyListOnChange("sesame");
                  }}
                  type="checkbox"
                  checked={allergyList.includes("sesame")}
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
            value={avoidList}
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
                setCurrentUser({
                  ...currentUser,
                  allergies: data.allergies,
                  diet: data.diet,
                  avoid: data.avoid,
                });
                setSavedVisible(true);
                setTimeout(() => {
                  setSavedVisible(false);
                }, 2500);
              });
          }}
        >
          Save
        </Save>
        <Cancel onClick={onCancel}>Close</Cancel>
      </AvoidDiv>
    </Body>
  );
};

const Body = styled.div`
  box-shadow: 1px 1px 10px #808080ab;
  border-radius: 8px;
  margin: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
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
  justify-content: space-evenly;
  margin-top: 5px;
  background-color: white;
  align-items: center;
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
  padding: 5px 7px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(2px);
    outline: none;
  }
`;

const Cancel = styled.button`
  padding: 5px 7px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
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
