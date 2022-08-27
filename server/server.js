"use strict";

const express = require('express');
const morgan = require("morgan");

const PORT = 8000;

express()

    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))

    // INITAL TEST ENDPOINT
    .get('/hi', (req, res) => {
    res.status(200).json({status: 200, message: "Hello bb"})
    })

    // CATCH ALL
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // SPIN UP SERVER AND LISTEN ON DESIGNATED PORT
    .listen(PORT, () => {
    console.log(`🪴 Listening on port ${PORT}🪴`)
    })