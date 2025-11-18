import express from "express";

const articleInfo = [
  { articleName: "learn-node", upvotes: 0, comments: [] },
  { articleName: "learn-react", upvotes: 0, comments: [] },
];

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello, World! via GET");
});

// app.get("/hello/:name", (req, res) => {
//   res.send("Hello, " + req.params.name + " via GET!");
// });

// app.post("/hello", (req, res) => {
//   res.send("Hello, " + req.body.name + " via POST!");
// });

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  const article = articleInfo.find((a) => a.articleName === articleName);
  article.upvotes += 1;
  //   res.send(
  //     "Success! " + articleName + " now has " + article.upvotes + " upvotes."
  //   );

  res.json(article);
});

app.post("/api/articles/:name/comments", (req, res) => {
  const articleName = req.params.name;
  const { postedBy, text } = req.body;
  const article = articleInfo.find((a) => a.articleName === articleName);
  article.comments.push({ postedBy, text });
  res.json(article);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
