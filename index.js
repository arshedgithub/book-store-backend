const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/book-store")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("could not connect to mongoDB..."));

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
