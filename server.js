const express = require("express");
const Entry = require("./models/entry");
const mongoose = require("mongoose");
const entryRouter = require("./routes/entries");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/journal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: "desc" });
  res.render("entries/index", { entries: entries });
});

app.use("/entries", entryRouter);

app.listen(5000);