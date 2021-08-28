const mongoose = require("mongoose");
const express = require("express");
const app = express();
const books = require("./routes/books");
const categories = require("./routes/categories");
const error = require("./middleware/error");
const users = require("./routes/users");

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
app.use("/api/users", users);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
