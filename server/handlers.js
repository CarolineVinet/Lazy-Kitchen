const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
require("es6-promise").polyfill();
require("isomorphic-fetch");

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
      console.log("result", result);
      if (result) {
        res.status(400).json({ status: 400 });
      }
      //   } else if (!result) {
      //     await db.collection("lazyusers").insertOne({
      //       firstName: req.body.firstName,
      //       lastName: req.body.lastName,
      //       _id: req.body.email,
      //       email: req.body.email,
      //       username: req.body.username,
      //       password: req.body.password,
      //     });
      //     res.status(201).json({
      //       user: {
      //         firstName: req.body.firstName,
      //         lastName: req.body.lastName,
      //         _id: req.body.email,
      //         email: req.body.email,
      //         username: req.body.username,
      //         password: req.body.password,
      //       },
      //     });
      //   }
    });

  console.log("user :: ", user);

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
  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=burger",
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
      console.log("result data :: ", data);
      res.status(200).json(data);
    });
};

module.exports = { handleSignUp, handleSignIn, handleGetBasicRecipe };
