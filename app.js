const express = require("express");
const bookspath = require("./routes/books");
const authorspath = require("./routes/authors");
const authpath = require("./routes/auth");
const userpath = require("./routes/users");
const axios = require('axios');
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const dotenv = require("dotenv");

dotenv.config();


// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("connected To MongoDB"))
//     .catch((error) => console.log("connected Faild To MongoDB!",error));

mongoose
    .connect("mongodb://localhost/bookstoreDB")
    .then(() => console.log("connected To MongoDB"))
    .catch((error) => console.log("connected Faild To MongoDB!",error));

const app = express();

// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

app.use(logger)

app.use("/api/books",bookspath);
app.use("/api/authors",authorspath);
app.use("/api/auth",authpath);
app.use("/api/users",userpath);

const PORT =process.env.PORT ||5000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`));

// const PORT =5000;
// app.listen(PORT, () => console.log(`server is running on port ${PORT}`));