require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");

const login = require("./controllers/loginController");
const register = require("./controllers/registerController");
const checkToken = require("./controllers/checkTokenController");
const createCard = require("./controllers/createCardController");
const createBill = require("./controllers/addBillsController");
const getBorrowers = require("./controllers/getAllBorrowerController");
const getEachBorrowers = require("./controllers/getEachBorrowerController");

const creditScrolling = require("./controllers/creditScrollingController");

const sendSMS = require("./routes/sendSMSRoute");
const cors = require("cors");
const cron = require("node-cron");
const sendSMSController = require("./controllers/sendSMSController");
const contractRoutes = require("./routes/contractRoute");
const { downloadContract } = require("./controllers/downloadPdfController");

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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// cron.schedule(process.env.JOB_SCHEDULE, () => {
//   sendSMSController.sendSMS();
// });

app.use("/users", userRoutes);
app.get("/api/checkToken", checkToken);
app.use("/sms", sendSMS);
app.use("/contract", contractRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome Kmutt");
// });
app.post("/users/login", login);
app.post("/users/register", register);
app.get("/api/checkToken", checkToken);

app.post("/api/createCard", createCard);
app.post("/api/addBill", createBill);

app.get("/api/getBorrowers", getBorrowers);
app.get("/api/getEachBorrowers/:nationID", getEachBorrowers);

app.post("/api/creditScrolling", creditScrolling);
app.post("/api/downloadPdf", downloadContract);

app.get("/", (req, res) => {
  res.status(200).send("Welcome Kmutt");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
