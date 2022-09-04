// MONGODB / ENV SETUP
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// IMPORT ADDITIONAL UTILITIES
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

// ADDS A NEW HOUSEPLANT
// .post("/api/add-user-plant", addPlantToHome)
const addPlantToHome = async (req, res) => {
    console.log(req.body)
    const userId = req.body._id;
    const basePlant = req.body.plant;

    const id = uuidv4();
    const date =  moment().format()
    const newPlant = {
        ...basePlant,
        plantId: basePlant._id,
        _id: id,
        dateAdded: date,
        lastWatered: basePlant.lastWatered ? moment(basePlant.lastWatered).format() : date,
        nextWatering: basePlant.lastWatered ? moment(basePlant.lastWatered).add(basePlant.wateringFrequency, "days").format() : moment().add(basePlant.wateringFrequency, "days").format(),
        room: basePlant.room || "",
        nickname: basePlant.nickname || ""
    }

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();

        // CHECK IF USER ALREADY EXISTS
        const checkUser = await db.collection("users").findOne({ _id: userId })
        if (!checkUser) {
            // IF USER DOES NOT EXIST, RETURN 404
            return res.status(404).json({ status: 404, success: false, data: userId, message: `User does not exist` })
        }
        else {
            // IF USER EXISTS, ADD PLANT TO HOUSEPLANT AND RETURN UPDATED USER 
            await db.collection("users").findOneAndUpdate(
                {_id: userId},
                {$push: {houseplants: newPlant}}, 
                // {returnNewDocument: true}
            );
            const updatedUser = await db.collection("users").findOne({ _id: userId })
            res.status(201).json({ status: 201, success: true, data: updatedUser, message: `Added ${newPlant.commonName} (${updatedUser._id}) to your home` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};

// UPDATES THE ROOM FOR A SPECIFIED HOUSEPLANT
// .patch("/api/update-plant-room", updatePlantRoom)
const updatePlantRoom = async (req, res) => {

    const userId = req.body._id;
    const houseplantId = req.body.plant._id;
    const room = req.body.room;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();

        // CHECK IF USER EXISTS
        const checkUser = await db.collection("users").findOne({ _id: userId })
        if (!checkUser) {
            // IF USER DOES NOT EXIST, RETURN 404
            return res.status(404).json({ status: 404, success: false, data: userId, message: `User does not exist` })
        }
        else {
            // CHECK IF HOUSEPLANT EXISTS
            const checkPlant = await db.collection("users").findOne(
                { 
                    _id: userId,
                    houseplants: { $elemMatch: {  _id: houseplantId}}
                }
            )
            if(!checkPlant){
                // IF PLANT DOES NOT EXIST, RETURN 404
                return res.status(404).json({ status: 404, success: false, data: houseplantId, message: `This plant is not in your home.` })
            }
            else {
                // IF HOUSEPLANT EXISTS, UPDATE HOUSEPLANT ROOM AND RETURN UPDATED USER
                await db.collection("users").findOneAndUpdate({ 
                        _id: userId,
                        houseplants: { $elemMatch: {  _id: houseplantId}}
                    },
                    {$set: {"houseplants.$[elem].room" : room}}, 
                    {arrayFilters: [ {"elem._id": houseplantId}], new: true}
                );
                const updatedUser = await db.collection("users").findOne({ _id: userId })
                res.status(200).json({ status: 200, success: true, data: updatedUser, message: `Updated the room of plant ${houseplantId} to ${room}` })
            }
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};

// DELETES A SPECIFIED HOUSEPLANT
// .delete("/api/delete-user-plant/:houseplant_Id?_id=userId", removePlantFromHome)
const removePlantFromHome = async (req, res) => {

    const houseplantId = req.params.houseplant_Id;
    const userId = req.query._id
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();

        // CHECK IF USER EXISTS
        const checkUser = await db.collection("users").findOne({ _id: userId })
        if (!checkUser) {
            // IF USER DOES NOT EXIST, RETURN 404
            return res.status(404).json({ status: 404, success: false, data: userId, message: `User does not exist` })
        }
        else {
            // CHECK IF HOUSEPLANT EXISTS
            const checkPlant = await db.collection("users").findOne(
                { 
                    _id: userId,
                    houseplants: { $elemMatch: {  _id: houseplantId}}
                }
            )
            if(!checkPlant){
                // IF PLANT DOES NOT EXIST, RETURN 404
                return res.status(404).json({ status: 404, success: false, data: houseplantId, message: `This plant is not in your home.` })
            }
            else {
                // IF HOUSEPLANT EXISTS, DELETE HOUSEPLANT AND RETURN UPDATED USER
                await db.collection("users").findOneAndUpdate({ 
                        _id: userId,
                        houseplants: { $elemMatch: {  _id: houseplantId}}
                    },
                    {$pull: {houseplants: { _id: houseplantId}}}
                );
                const updatedUser = await db.collection("users").findOne({ _id: userId })
                res.status(200).json({ status: 200, success: true, data: updatedUser, message: `Deleted plant ${houseplantId}` })
            }
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};

// DELETES ALL HOUSEPLANTS
// .delete("/api/delete-user-plants/:userId", removeAllPlantsFromHome)
const removeAllPlantsFromHome = async (req, res) => {

    const userId = req.params.userId
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();

        // CHECK IF USER EXISTS
        const checkUser = await db.collection("users").findOne({ _id: userId })
        if (!checkUser) {
            // IF USER DOES NOT EXIST, RETURN 404
            return res.status(404).json({ status: 404, success: false, data: userId, message: `User does not exist` })
        }
        else {
            // IF USER EXISTS, RESET HOUSEPLANT ARRAY AND RETURN UPDATED USER 
            await db.collection("users").findOneAndUpdate(
                {_id: userId},
                {$set: {houseplants: []}}, 
            );
            const updatedUser = await db.collection("users").findOne({ _id: userId })
            res.status(200).json({ status: 200, success: true, data: updatedUser, message: `Deleted all plants from your home` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};

module.exports = {
    addPlantToHome,
    updatePlantRoom,
    removePlantFromHome,
    removeAllPlantsFromHome
}