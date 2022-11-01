const express = require("express");
const bodyParser = require("body-parser");

let articles = [
  { id: 0, author: "Mack", body: "Post 1" },
  { id: 1, author: "Jack", body: "Post 2" },
  { id: 2, author: "Zack", body: "Post 3" },
];

const hello = (req, res) => res.send({ hello: "world" });

const getArticles = (req, res) => res.send(articles);

// TODO: get the correct article by using the id
const getArticle = (req, res) => res.send({ article: articles[req.params.id] });

const addArticle = (req, res) => {
  // TODO: add an article (i.e. push new article on existing article array)
  const newArticles = {id: articles.length, author: 'Tingting', body:'A new post'};
  articles.push(newArticles);
  res.send(articles);
  //curl -X POST http://localhost:3000/article
};

const app = express();
app.use(bodyParser.json());
app.get("/", hello);
app.get("/articles", getArticles);
app.get("/articles/:id", getArticle);
app.post("/article", addArticle);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  const addr = server.address();
  console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
