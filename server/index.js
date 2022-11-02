const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(() => {
    console.log('Error while connecting to MongoDB')
  })

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");
  });