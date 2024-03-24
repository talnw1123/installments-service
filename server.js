
require('dotenv').config()

const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoute")
const auth = require("./routes/auth")
const cors = require("cors")

const app = express();
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use('/users', userRoutes)
app.use('/users', auth)
app.get("/", (req, res) => {
    res.status(200).send("Welcome Kmuut");
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

