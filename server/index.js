"use strict";

const express = require("express");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const {
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
} = require("./handlers");

const PORT = process.env.PORT || 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(cors())
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.static("./uploads"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //Endpoints

  //GET
  .get("/signin", handleSignIn)
  .get("/getbasicrecipe", handleGetBasicRecipe)
  .get("/getrecipe/:id", handleRecipeById)
  .get("/getrecipebyingredients", handleRecipeByIngredients)
  .get("/getallfavorites", handleGetAllFavorites)
  .get("/getuserhistory", handleGetUserHistory)
  .get("/getallreviews", handleGetAllReviews)

  //POST

  .post("/signup", handleSignUp)
  .post("/uploadFile", upload.single("profilepic"), (req, res) => {
    res.send("200");

    let fileType = req.file.mimetype.split("/")[1];
    let newFileName = req.file.filename + "." + fileType;

    fs.rename(
      `./uploads/${req.file.filename}`,
      `./uploads/${newFileName}`,
      function () {
        console.log("callback");
      }
    );
  })

  //PUT//

  .put("/addfavorite", handleFavorite)
  .put("/removefavorite", handleUnfavorite)
  .put("/triedit", handleTriedIt)
  .put("/updateuser", handleUpdateUser)
  .put("/addreview", handleAddReview)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
