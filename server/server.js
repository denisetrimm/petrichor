"use strict";

const express = require('express');
const morgan = require("morgan");

const PORT = 8000;

const {
    getPlants,
    getSinglePlant,
} = require("./handlers/plantHandlers");

const {
    getUser
} = require("./handlers/userHandlers");

express()

    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))


    // GET ALL PLANTS
    .get("/api/get-plants", getPlants)
    // RETURNS A SINGLE PLANT
    .get("/api/get-plant/:plantId", getSinglePlant)


    // RETURNS A SINGLE USER
    .get("/api/get-user/:userId", getUser)


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