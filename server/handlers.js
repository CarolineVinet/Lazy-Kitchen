const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleSignUp = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("lazychefproject");

  const users = await db.collection("lazyusers").insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    _id: req.body.email,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  res.status(201).json({ firstName: req.body.firstName });

  client.close();
};

module.exports = { handleSignUp };
