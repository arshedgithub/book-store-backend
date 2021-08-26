const mongoose = require("mongoose");
const books = require("./routes/books");
const categories = require("./routes/categories");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/book-store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("could not connect to mongoDB..."));

app.use(express.json());
app.use("/api/books", books);
app.use("/api/categories", categories);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
