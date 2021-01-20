// importing all the stuffs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Posts from "./Posts.js";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

//db config
const connection_url =
  "mongodb+srv://admin:jOFD2ZHihPT5JZan@cluster0.f5afg.mongodb.net/blogs?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected");
  });


//api route
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/post/sync", (req, res) => {
  Posts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null,`${new Date().getTime()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

app.post("/post/new", upload.single("image"), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file uploaded" });
  } else {
    const dbPost = {
      title: req.body.title,
      description: req.body.description,
      img: req.file.filename,
      timestamp: req.body.timestamp,
    };
    Posts.create(dbPost, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`listenting on localhost${port}`);
});
