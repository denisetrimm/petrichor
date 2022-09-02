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
        lastWatered: date,
        nextWatering: moment().add(basePlant.wateringFrequency, "days").format(),
        room: ""
    }
    console.log(newPlant)
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
                {$push: {housePlants: newPlant}}, 
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

// DELETES A SPECIFIED HOUSEPLANT
// .delete("/api/delete-user-plant/:houseplant_Id?_id=userId", removePlantFromHome)
const removePlantFromHome = async (req, res) => {

    const houseplantId = req.params.houseplant_Id;
    console.log(`houseplantId: ${houseplantId}`)
    const userId = req.query._id
    console.log(`userId: ${userId}`)
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
                    housePlants: { $elemMatch: {  _id: houseplantId}}
                }
            )
            if(!checkPlant){
                // IF PLANT DOES NOT EXIST, RETURN 404
                return res.status(404).json({ status: 404, success: false, data: houseplantId, message: `This plant is not in your house.` })
            }
            else {
                // IF HOUSEPLANT EXISTS, DELETE HOUSEPLANT
                await db.collection("users").findOneAndUpdate({ 
                        _id: userId,
                        housePlants: { $elemMatch: {  _id: houseplantId}}
                    },
                    {$pull: {housePlants: { _id: houseplantId}}}
                );
                res.status(200).json({ status: 200, success: true, message: `Deleted plant ${houseplantId}` })
            }
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
    removePlantFromHome
}