require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const ConnectDB = require('./utils/DB');
const router = require("./routes/AuthRoute");

const app = express();

// Connect DB
ConnectDB()

// App Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res
    .status(200)
    .send(`${process.env.APP_NAME} backend service currently running`);
});

// ROUTES 
app.use('/auth/user', router)


// Declare and listen to port
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} running on port ${PORT}`);
});
