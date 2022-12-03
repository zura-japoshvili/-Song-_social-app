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
const User = require('./models/User');

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



const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'client/src/assets/public/images')
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage});


app.post('/api/upload',   upload.single('image'), (req, res) => {
  const imgPath = req.file.path;
  const userId = req.body.id;
  const updatedPath = async (userId, imgPath) => {
    try {
      const newUserImg = await User.findByIdAndUpdate({_id: userId}, {profilePicture: imgPath});
      console.log(newUserImg.profilePicture)
      res.status(200).json(newUserImg.profilePicture)
    }catch (e) {
      res.status(500).json("Oops");
    }
  }

  updatedPath(userId, imgPath);
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");
  });