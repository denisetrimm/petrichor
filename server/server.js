"use strict";

const express = require('express');
const morgan = require("morgan");

const PORT = 8000;

// FUNCTION IMPORTS
// ________________________________________________

const {
    getPlants,
    getSinglePlant,
} = require("./handlers/plantHandlers");

const {
    getUser,
    loginUser,
    deleteUser,
} = require("./handlers/userHandlers");

const {
    addPlantToHome,
    updatePlantRoom,
    updateSingleHouseplant,
    waterPlant,
    snoozePlant,
    setSnooze,
    removePlantFromHome,
    removeAllPlantsFromHome
} = require("./handlers/houseplantHandlers");

// ________________________________________________

express()

    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))

    // PLANT ENDPOINTS
    // ________________________________________________

    // GET ALL PLANTS
    .get("/api/get-plants", getPlants)

    // RETURNS A SINGLE PLANT
    .get("/api/get-plant/:plantId", getSinglePlant)


    // USER ENDPOINTS
    // ________________________________________________

    // RETURNS A SINGLE USER
    .get("/api/get-user/:userId", getUser)

    // RETURNS USER DATA - IF USER DOESN'T EXIST, CREATES USER
    .post("/api/login-user", loginUser)

    // DELETES A SPECIFIED USER
    .delete("/api/delete-user/:userId", deleteUser)


    // HOUSEPLANT ENDPOINTS
    // ________________________________________________

    // ADDS A NEW HOUSEPLANT
    .post("/api/add-user-plant", addPlantToHome)

    // UPDATES THE ROOM FOR A SPECIFIED HOUSEPLANT
    .patch("/api/update-plant-room", updatePlantRoom)

    // UPDATES THE DETAILS FOR A SPECIFIED HOUSEPLANT
    .patch("/api/update-single-houseplant", updateSingleHouseplant)

    // WATER A SPECIFIED HOUSEPLANT
    .patch("/api/water-plant", waterPlant)

    // SNOOZE A SPECIFIED HOUSEPLANT
    .patch("/api/snooze-plant", snoozePlant)

    //  SET GLOBAL SNOOZE DURATION
    .patch("/api/set-snooze", setSnooze)

    // DELETES A SPECIFIED HOUSEPLANT
    .delete("/api/delete-user-plant/:houseplant_Id", removePlantFromHome)

    // DELETES ALL HOUSEPLANTS FOR USER
    .delete("/api/delete-user-plants/:userId", removeAllPlantsFromHome)

    // CATCH ALL
    // ________________________________________________

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