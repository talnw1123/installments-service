// require('dotenv').config();
// const cookieParser = require('cookie-parser');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodeCron = require('node-cron');
// const userRoutes = require('./routes/userRoute');
// const login = require('./controllers/loginController');
// const register = require('./controllers/registerController');
// const checkToken = require('./controllers/checkTokenController');
// const createCard = require('./controllers/createCardController');
// const createBill = require('./controllers/addBillsController');
// const getBorrowers = require('./controllers/getAllBorrowerController');
// const getEachBorrowers = require('./controllers/getEachBorrowerController');
// const creditScrolling = require('./controllers/creditScrollingController');
// const addPayment = require('./controllers/ิaddPaymentController');
// const getAllBills = require('./controllers/getAllBillsController');
// const sendSMS = require('./routes/sendSMSRoute');
// const contractRoutes = require('./routes/contractRoute');
// const { downloadContract } = require('./controllers/downloadPdfController');
// const updateBill = require('./controllers/logBillsController');
// const getDailyLogs = require('./controllers/dailyLogController');
// const sendSMSController = require('./controllers/sendSMSController');
// const Bill = require('./models/billsModel'); // Assuming Bill model is in the models folder
// const DailyLog = require('./models/dailyLogModel'); // Assuming DailyLog model is in the models folder

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: process.env.DB_NAME,
//   user: process.env.USER_DB,
//   pass: process.env.PASS_DB,
// });

// const db = mongoose.connection;
// db.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// app.use('/users', userRoutes);
// app.get('/api/checkToken', checkToken);
// app.use('/sms', sendSMS);
// app.use('/contract', contractRoutes);

// app.post('/users/login', login);
// app.post('/users/register', register);
// app.post('/api/createCard', createCard);
// app.post('/api/addBill', createBill);
// app.get('/api/getBorrowers', getBorrowers);
// app.get('/api/getEachBorrowers/:nationID', getEachBorrowers);
// app.post('/api/creditScrolling', creditScrolling);
// app.post('/api/downloadPdf', downloadContract);
// app.get('/api/updateBills', updateBill);
// app.get('/api/dailyLogs', getDailyLogs);
// app.post('/api/addPayment', addPayment);
// app.get('/api/getAllBills', getAllBills);
// app.get('/', (req, res) => {
//   res.status(200).send('Welcome Kmutt');
// });

// // Schedule a cron job to log daily payments and outstanding debt
// nodeCron.schedule('0 0 * * *', async () => {
//   try {
//     const bills = await Bill.find();
//     let totalPaid = 0;
//     let totalOutstanding = 0;

//     bills.forEach(bill => {
//       const dailyPayments = bill.paymentHistory.filter(payment => {
//         const paymentDate = new Date(payment.paymentDate).toLocaleDateString('en-US');
//         const today = new Date().toLocaleDateString('en-US');
//         return paymentDate === today;
//       });

//       dailyPayments.forEach(payment => {
//         totalPaid += payment.amount;
//       });

//       totalOutstanding += bill.totalPaymentWithInterest - dailyPayments.reduce((sum, payment) => sum + payment.amount, 0);
//     });

//     const newLog = new DailyLog({
//       date: new Date(),
//       totalPaid,
//       totalOutstanding
//     });

//     await newLog.save();
//     console.log('Daily log saved:', newLog);
//   } catch (error) {
//     console.error('Error logging daily payments and outstanding debt:', error);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

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
const updateCard = require("./controllers/editBorrowerController");

const creditScrolling = require("./controllers/creditScrollingController");

const addPayment = require("./controllers/ิaddPaymentController");
const getAllBills = require("./controllers/getAllBillsController");

const sendSMS = require("./routes/sendSMSRoute");
const cors = require("cors");
const cron = require("node-cron");
const sendSMSController = require("./controllers/sendSMSController");
const contractRoutes = require("./routes/contractRoute");
const { downloadContract } = require("./controllers/downloadPdfController");

const calculateDailyLog = require("./controllers/logBillsController"); // Import the calculateDailyLog controller
const getDailyLogs = require("./controllers/dailyLogController");

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

cron.schedule(process.env.JOB_SCHEDULE, () => {
  sendSMSController.sendSMS();
});

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
app.post("/api/updateCard/:nationID", updateCard);

app.post("/api/creditScrolling", creditScrolling);
app.post("/api/downloadPdf", downloadContract);

app.post("/api/addPayment", addPayment);
app.get("/api/getAllBills", getAllBills);

app.use("/api/dailyLogs", getDailyLogs);

app.get("/", (req, res) => {
  res.status(200).send("Welcome Kmutt");
});

cron.schedule("*/10 * * * * *", () => {
  calculateDailyLog()
    .then(() => {
      console.log("Daily log calculated and saved.");
    })
    .catch((error) => {
      console.error("Error calculating daily log:", error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
