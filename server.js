require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const checkToken = require("./controllers/checkTokenController");
const sendSMS = require("./routes/sendSMSRoute");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.USER_DB,
  pass: process.env.PASS_DB,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use("/users", userRoutes);
app.get("/api/checkToken", checkToken);
app.use("/sms", sendSMS);

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome Kmutt");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
