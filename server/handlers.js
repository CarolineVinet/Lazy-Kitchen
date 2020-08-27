const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
require("es6-promise").polyfill();
require("isomorphic-fetch");
const assert = require("assert");
const moment = require("moment");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleSignUp = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("lazychefproject");

  const user = await db
    .collection("lazyusers")
    .findOne({ _id: req.body.email }, (err, result) => {
      if (result) {
        res.status(400).json({ status: 400 });
      }
    });

  if (!user) {
    await db.collection("lazyusers").insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      _id: req.body.email,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      favorites: req.body.favorites,
      history: req.body.history,
      allergies: req.body.allergies,
      diet: req.body.diet,
      avoid: req.body.avoid,
    });
    res.status(201).json({
      status: 201,
      user: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        _id: req.body.email,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        favorites: req.body.favorites,
        history: req.body.history,
        allergies: req.body.allergies,
        diet: req.body.diet,
        avoid: req.body.avoid,
      },
    });
  }
  client.close();
};

const handleSignIn = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("lazychefproject");

  const user = await db
    .collection("lazyusers")
    .findOne({ _id: req.query.email }, (err, result) => {
      if (result && result.password === req.query.password) {
        res.status(200).json({ status: 200, user: result });
      } else if (result && result.password !== req.query.password) {
        res.status(400).json({ status: 400 });
      } else if (!result) {
        res.status(404).json({ status: 404 });
      }
    });

  client.close();
};

const handleGetBasicRecipe = (req, res) => {
  const query = req.query.search;
  const diet = req.query.diet ? `&diet=${req.query.diet}` : "";
  const intolerances = req.query.allergies
    ? `&intolerances=${req.query.allergies}`
    : "";
  const excludeIngredients = req.query.avoid
    ? `&excludeIngredients=${req.query.avoid}`
    : "";
  const lazyState = req.query.lazy;

  console.log("diet stuff :: ", diet, intolerances, excludeIngredients);

  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}${diet}${intolerances}${excludeIngredients}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(typeof data);
      const results = data.results;

      if (req.query.lazy === "energized") {
        results.sort((a, b) => {
          return b.readyInMinutes - a.readyInMinutes;
        });
        res.status(200).json(results);
      } else if (req.query.lazy === "tired") {
        results.sort((a, b) => {
          return a.readyInMinutes - b.readyInMinutes;
        });
        res.status(200).json(results);
      } else if (req.query.lazy === "deadtired") {
        const newData = results.filter((item) => item.readyInMinutes <= 20);
        newData.sort((a, b) => {
          return a.readyInMinutes - b.readyInMinutes;
        });
        res.status(200).json(newData);
      } else {
        res.status(200).json(results);
      }
    });
};

const handleRecipeById = (req, res) => {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/analyzedInstructions?stepBreakdown=false`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
          },
        }
      )
        .then((recipeResponse) => recipeResponse.json())
        .then((recipeData) => {
          if (recipeData.length > 0) {
            res.status(200).json({ ...data, recipeSteps: recipeData[0].steps });
          } else {
            res.status(200).json({ ...data, recipeSteps: [] });
          }
        });
    });
};

const handleRecipeByIngredients = (req, res) => {
  const resultsArr = [];
  try {
    const ingredients = req.query.search;
    console.log("diet stuff line 159 :: ", req.query);
    const diet = req.query.diet ? `&diet=${req.query.diet}` : "";
    const intolerances = req.query.allergies
      ? `&intolerances=${req.query.allergies}`
      : "";
    const excludeIngredients = req.query.avoid
      ? `&excludeIngredients=${req.query.avoid}`
      : "";

    console.log("diet stuff :: ", diet, intolerances, excludeIngredients);

    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?number=12&ranking=1&ignorePantry=false&includeIngredients=${ingredients}${diet}${intolerances}${excludeIngredients}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("first success", data.results.length);

        if (data.results.length === 0) {
          res.status(200).json([]);
        }

        return new Promise((resolve) => {
          let count = 0;

          data.results.forEach((item) => {
            fetch(
              `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${item.id}/information`,
              {
                method: "GET",
                headers: {
                  "x-rapidapi-host":
                    "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                  "x-rapidapi-key":
                    "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
                },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((responseData) => {
                if (responseData.id) {
                  resultsArr.push(responseData);
                }
                count++;
                console.log("success number :: ", count);

                if (count >= data.results.length) {
                  resolve();
                }
              });
          });
        }).then(() => {
          const results = resultsArr;
          console.log("final success");
          if (req.query.lazy === "energized") {
            results.sort((a, b) => {
              return b.readyInMinutes - a.readyInMinutes;
            });
            res.status(200).json(results);
          } else if (req.query.lazy === "tired") {
            results.sort((a, b) => {
              return a.readyInMinutes - b.readyInMinutes;
            });
            res.status(200).json(results);
          } else if (req.query.lazy === "deadtired") {
            const newData = results.filter((item) => item.readyInMinutes <= 20);
            newData.sort((a, b) => {
              return a.readyInMinutes - b.readyInMinutes;
            });
            res.status(200).json(newData);
          } else {
            res.status(200).json(results);
          }
        });
      });
  } catch (e) {
    console.log("error :: ", e);
    res.status(500).json({});
  }
};

const handleFavorite = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("lazychefproject");

    const query = { _id: req.body.userId };

    const newFavorites = [];

    await db.collection("lazyusers").findOne(query, async (err, result) => {
      newFavorites.push(...result.favorites, req.body.recipeId);

      const newValues = {
        $set: { favorites: newFavorites },
      };

      const r = await db.collection("lazyusers").updateOne(query, newValues);
      console.log(r.modifiedCount);
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);
      res.status(200).json(newFavorites);
      client.close();
    });
  } catch (e) {
    console.log(e);
    client.close();
    res.status(500).json(e);
  }
};

const handleUnfavorite = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("lazychefproject");

    const query = { _id: req.body.userId };

    const newFavorites = [];

    await db.collection("lazyusers").findOne(query, async (err, result) => {
      result.favorites.forEach((favorite) => {
        if (favorite !== req.body.recipeId) {
          newFavorites.push(favorite);
        }
      });

      const newValues = {
        $set: { favorites: newFavorites },
      };

      const r = await db.collection("lazyusers").updateOne(query, newValues);
      console.log(r.modifiedCount);
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);
      client.close();
      res.status(200).json(newFavorites);
    });
  } catch (e) {
    console.log(e);
    client.close();
    res.status(500).json(e);
  }
};

const handleGetAllFavorites = async (req, res) => {
  const favorites = req.query.favorites.split(",");
  const favoritesArr = [];

  return new Promise((resolve) => {
    let count = 0;

    favorites.forEach((favorite) => {
      fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${favorite}/information`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          favoritesArr.push(data);
          count++;

          if (count >= favorites.length) {
            resolve();
          }
        });
    });
  }).then(() => {
    res.status(200).json(favoritesArr);
  });
};

const handleTriedIt = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("lazychefproject");

    const query = { _id: req.body.userId };

    const newHistory = [];

    await db.collection("lazyusers").findOne(query, async (err, result) => {
      newHistory.push(...result.history, {
        recipeId: req.body.recipeId,
        isLiked: req.body.isLiked,
      });

      const newValues = {
        $set: { history: newHistory },
      };

      const r = await db.collection("lazyusers").updateOne(query, newValues);
      console.log(r.modifiedCount);
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);
      client.close();
      res.status(200).json(newHistory);
    });
  } catch (e) {
    console.log(e);
    client.close();
    res.status(500).json(e);
  }
};

const handleGetUserHistory = async (req, res) => {
  const history = req.query.history.split(",");
  const historyArr = [];

  return new Promise((resolve) => {
    let count = 0;

    history.forEach((recipeId) => {
      console.log(recipeId);
      fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "0743ec8629mshf67977e8c63b981p158834jsn37aa89ebfd81",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          historyArr.push(data);
          count++;

          if (count >= history.length) {
            resolve();
          }
        });
    });
  }).then(() => {
    res.status(200).json(historyArr);
  });
};

const handleUpdateUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("lazychefproject");

    const query = { _id: req.body.userId };

    console.log("user update line 435 :: ", req.body);

    const newValues = {
      $set: {
        allergies: req.body.allergies,
        diet: req.body.diet,
        avoid: req.body.avoid,
      },
    };

    const r = await db.collection("lazyusers").updateOne(query, newValues);
    console.log(r.modifiedCount);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    client.close();
    res.status(200).json({
      allergies: req.body.allergies,
      diet: req.body.diet,
      avoid: req.body.avoid,
    });
  } catch (e) {
    console.log(e);
    client.close();
    res.status(500).json(e);
  }
};

const handleGetAllReviews = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("lazychefproject");

  const reviews = await db.collection("reviews").find().toArray();

  console.log("handlers line 469 ::: ", reviews);
  client.close();
  res.status(200).json(reviews);
};

const handleAddReview = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("lazychefproject");

  const newReview = {
    author: req.body.author,
    recipeId: req.body.recipeId,
    body: req.body.body,
    rating: req.body.rating,
    date: moment().format("h:mm a , MMMM Do YYYY"),
  };
  await db.collection("reviews").insertOne(newReview);
  client.close();
  res.status(201).json(newReview);
};

module.exports = {
  handleSignUp,
  handleSignIn,
  handleGetBasicRecipe,
  handleRecipeById,
  handleFavorite,
  handleUnfavorite,
  handleGetAllFavorites,
  handleRecipeByIngredients,
  handleTriedIt,
  handleGetUserHistory,
  handleUpdateUser,
  handleGetAllReviews,
  handleAddReview,
};
