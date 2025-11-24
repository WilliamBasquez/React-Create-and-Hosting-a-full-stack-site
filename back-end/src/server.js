import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb"
import admin from "firebase-admin";
import fs from "fs";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

app.use(express.json());

let db;

async function connectToDB() {
  // const uri = "mongodb+srv://webasquez:L8ju22At5I4V333w@cluster0.gqylp.mongodb.net/?appName=Cluster0";
  const uri = "mongodb://127.0.0.1:27017"

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      string: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db("full-stack-react-db");
}

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  connectToDB();

  const article = await db.collection("articles").findOne({ name });

  res.json(article);
});

app.use(async function(req, res, next){
  const {authorization} = req.headers;

  if (authorization){
    const user = await admin.auth().verifyIdToken(authorization);
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote){ 
    const updatedArticle = await db.collection("articles").findOneAndUpdate({ name }, {
      $inc: { upvotes: 1 },
      $push: { upvoteIds: uid }
    }, {
      returnDocument: "after"
    });
    res.json(updatedArticle);
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };
  const { uid } = req.user;

  if (uid != null){ 
    const updatedArticle = await db.collection("articles").findOneAndUpdate({ name }, {
      $push: { comments: newComment }
    }, {
      returnDocument: "after"
    });
    
    res.json(updatedArticle)
  } else {
    res.sendStatus(403);
  }
})

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  const article = articleInfo.find((a) => a.articleName === articleName);
  article.upvotes += 1;

  res.json(article);
});

app.post("/api/articles/:name/comments", (req, res) => {
  const articleName = req.params.name;
  const { postedBy, text } = req.body;
  const article = articleInfo.find((a) => a.articleName === articleName);
  article.comments.push({ postedBy, text });
  res.json(article);
});

async function start() {
  await connectToDB();

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

start();