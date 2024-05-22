const express = require("express");
const serverless = require("serverless-http");
const srcApp = require("../src/app");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("App is running..");
});

app.use("/", router);
module.exports.handler = serverless(srcApp);
