const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
require("es6-promise").polyfill();
require("isomorphic-fetch");
const assert = require("assert");

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
    });
    res.status(201).json({
      user: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        _id: req.body.email,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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

  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}`,
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
      res.status(200).json(data);
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
      res.status(200).json(data);
    });
};

const handleRecipeByIngredients = (req, res) => {
  try {
    const ingredients = req.query.search;

    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=${ingredients}`,
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
        res.status(200).json(data);
      });
  } catch (e) {
    console.log("error :: ", e);
    res.status(500).json({});
  }
};

const handleFavorite = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

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
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const handleUnfavorite = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

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
      res.status(200).json(newFavorites);
    });
  } catch (e) {
    console.log(e);
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
  try {
    const client = await MongoClient(MONGO_URI, options);

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
      res.status(200).json(newHistory);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const handleGetUserHistory = async (req, res) => {
  const history = req.query.history.split(",");
  console.log("handlers 286 :: ", history);
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
    console.log("user history recipes :: ", historyArr.length, historyArr);
    res.status(200).json(historyArr);
  });
};

const handleUpdateUser = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("lazychefproject");

    const query = { _id: req.body.userId };

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
    res
      .status(200)
      .json({
        allergies: req.body.allergies,
        diet: req.body.diet,
        avoid: req.body.avoid,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
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
};
