const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute= require("./routes/book");

dotenv.config();
// connect database

mongoose.connect((process.env.MONGODB_URL))
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
app.use(bodyParser.json({limit:"50mb"}));

app.use(cors());

app.use(morgan("common")); // hiện ở dưới terminal là các phương thức là get , post
// trong khi sử dụng postman

// app.get("/api",(req,res) => {
//     res.status(200).json("HEllo");
// })
 

app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);
app.listen(8000,() => {
    console.log("Sever is running ... ");
})


