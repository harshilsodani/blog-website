const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;

// database credentials
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const homeStartingContent =
  "Welcome to DIGIVARTA, where technology meets inspiration! Dive into a world of innovation, knowledge, and endless possibilities. Explore captivating articles, expert analysis, and thought-provoking insights that unravel the mysteries of the tech universe. From the latest gadgets to groundbreaking advancements, we cover it all. Join our community of tech enthusiasts, entrepreneurs, and visionaries to embark on a journey of discovery. Discover the artistry behind coding, the marvels of AI, and the transformative power of digital disruption. Fuel your curiosity, ignite your passion, and unlock a world of digital wonders. Welcome to Digivarta - Where Tech Transforms and Inspires!";

const aboutContent = [
  "Welcome to Digivarta, an endeavor fueled by my passion for technology. I'm Harshil Sodani, a dedicated third-year student pursuing a Bachelor of Technology in Computer Science from SKIT Jaipur. As the sole member of this tech-driven journey, I aim to share my knowledge and insights with fellow tech enthusiasts like you.",
  "Digivarta is a space where I explore the ever-evolving world of technology, unraveling its mysteries and showcasing its transformative power. Through engaging articles, informative tutorials, and curated resources, my goal is to bridge the gap between theory and practical application.",
  "Join me on this exhilarating adventure as we dive into the realms of programming, artificial intelligence, and the latest tech trends. Together, let's embrace a future where technology knows no bounds.",
  "Welcome to Digivarta, where technology meets inspiration!",
];

const contactContent = [
  "We would love to hear from you! Whether you have questions, feedback, or simply want to connect, feel free to reach out using the contact information provided below. Your thoughts and inquiries are important to us, and we strive to respond as promptly as possible.",

  "Email: [email protected]",
  "Phone: +1-123-456-7890",

  "Please don't hesitate to get in touch with us. We value your engagement and look forward to the opportunity to connect with fellow tech enthusiasts like yourself.",

  "Stay inspired, stay curious, and let's continue exploring the ever-evolving world of technology together.",
];

const app = express();

let posts = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://" +
    DB_USERNAME +
    ":" +
    DB_PASSWORD +
    "@cluster0.6dluecf.mongodb.net/blogDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

app.get("/", async function (req, res) {
  try {
    posts = [];
    posts = await Post.find();

    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/about", function (req, res) {
  res.render("about", { paragraphs: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { paragraphs: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postId", async function (req, res) {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });

    if (!post) {
      return res.render("error", { message: "Article dose not exist!" });
    }

    res.render("post", {
      post: post,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/compose", async function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.body.authorTitle,
    password: req.body.passwordBody.toString(),
    date: new Date().toISOString(),
  });

  try {
    if (!post.title || !post.content || !post.author || !post.password) {
      res.send(
        '<script>alert("Please enter all the details."); window.location="/compose";</script>'
      );
      return res.render("compose");
    }

    await post.save();
    res.redirect("/");
    console.log("successfully saved");
  } catch (err) {
    console.log(err);
  }
});

app.get("/posts/modify/:postId", async function (req, res) {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });

    res.render("modify", { postId: requestedPostId, post: post });
  } catch (err) {
    console.log(err);
  }
});

app.post("/modify/:postId", async (req, res) => {
  const postId = req.params.postId;
  const updatedTitle = req.body.postTitle;
  const updatedContent = req.body.postBody;
  const updatedAuthor = req.body.authorTitle;
  const password = req.body.passwordBody;

  const post = await Post.findOne({ _id: postId });

  try {
    if (password === post.password) {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { title: updatedTitle, content: updatedContent, author: updatedAuthor },
        { new: true }
      );

      res.redirect(`/posts/${postId}`);
    } else {
      res.send(
        '<script>alert("Password did not match."); window.location="/modify/' +
          { postId } +
          '";</script>'
      );
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/posts/delete/:postId", async function (req, res) {
  const postId = req.params.postId;
  const enteredPassword = req.query.password;
  try {
    const post = await Post.findOne({ _id: postId });

    if (enteredPassword === post.password) {
      await Post.deleteOne({ _id: postId });
      return res.redirect("/");
    } else {
      return res.send(
        '<script>alert("Password did not match."); window.location="/posts/' +
          postId +
          '";</script>'
      );
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, function () {
  console.log(`server started at port ${PORT}`);
});
