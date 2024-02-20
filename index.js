import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;
var db = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views");

app.get("/", (req, res) => {
  res.render("index", { data: db });
});

app.post("/create", (req, res) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  db.push([postTitle, postContent]);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postIds = req.body.postIds;

  if (Array.isArray(postIds)) {
    postIds.forEach((postId) => {
      const indexToRemove = db.indexOf(db.find((item) => item[0] === postId));
      if (indexToRemove !== -1) {
        db.splice(indexToRemove, 1);
      }
    });
  } else if (typeof postIds === 'string') {
    const indexToRemove = db.indexOf(db.find((item) => item[0] === postIds));
    if (indexToRemove !== -1) {
      db.splice(indexToRemove, 1);
    }
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
