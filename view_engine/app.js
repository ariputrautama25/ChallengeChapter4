const express = require("express");
const app = express();
const port = 8000;

const data = require("./data.json");
app.set("view engine", "ejs");
app.use(express.static("public"));

function logMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.get("/", logMiddleware, (req, res, next) => {
  try {
    res.render("index.ejs");
  } catch (err) {
    next(err);
  }
});

app.get("/users", (req, res, next) => {
  try {
    res.render("users/index.ejs", { users: data.users });
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res, next) => {
  return res.render("error/not-found.ejs", { endpoint: req.url });
});

// 500 handler
app.use((err, req, res, next) => {
  return res.render("error/internal-server-error.ejs", { err: err.message });
});

app.listen(port, () => console.log("running on port", port));
