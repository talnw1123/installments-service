require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoute");
const checkToken = require('./controllers/checkTokenController');

const cors = require("cors");
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRoutes);
app.get('/api/checkToken', checkToken)

app.get("/", (req, res) => {
  res.status(200).send("Welcome Kmutt");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4400, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
