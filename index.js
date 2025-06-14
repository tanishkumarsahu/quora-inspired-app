const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 8080;
app.use(express.urlencoded({ extended: true })); //Middleware [parse data]

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "CodeWithArjun",
    content: "Finally cracked that Google interview! 6 months of LeetCode grind paid off. Starting as SDE-2 in Bangalore next month. Dreams do come true! 🚀"
  },
  {
    id: uuidv4(),
    username: "PriyaInTech",
    content: "Built my first React Native app for local vegetable vendors in Mumbai. Technology solving real problems hits different. Open sourcing it soon!"
  },
  {
    id: uuidv4(),
    username: "DevOpsRahul",
    content: "Deployed 50+ microservices today using Kubernetes. Remember when we used to manually SSH into servers? Those were the days... not! 😅"
  },
  {
    id: uuidv4(),
    username: "AIEnthusiast_Kavya",
    content: "Just published my research paper on Hindi NLP models. Proud to contribute to making AI more accessible for Indian languages. Bharat ka AI! 🇮🇳"
  },
  {
    id: uuidv4(),
    username: "StartupVinay",
    content: "From Tier-3 city to Y Combinator! Our fintech startup is helping rural farmers access micro-loans. Next stop: Series A funding round."
  },
  {
    id: uuidv4(),
    username: "TechLead_Sneha",
    content: "Leading a team of 15 developers across Chennai and Hyderabad. Remote work changed everything, but Indian talent is conquering the world! 💪"
  }
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts/");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id/", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("Request recived");
});
