const { config } = require("dotenv");
config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://mern-blog-0lg4.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/", userRoutes);
app.use("/", postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port ", PORT);
});
