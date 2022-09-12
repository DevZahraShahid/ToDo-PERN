const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); //db connection

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening server on port ${port}`));
