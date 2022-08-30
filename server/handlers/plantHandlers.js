// MONGODB / ENV SETUP
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// IMPORT UUID
const { v4: uuidv4 } = require('uuid');

// RETURNS ALL PLANTS
// .get("/api/get-plants", getPlants)
const getPlants = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection("plants").find().toArray();
        if (result.length === 0){
            return res.status(404).json({ status: 404, message: "No plants were found." })
        }
        else {
            return res.status(200).json({ status: 200, data: result })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected");
};

// RETURNS A SINGLE PLANT
// .get("/api/get-plant/:plantId", getSinglePlant)
const getSinglePlant = async (req, res) => {

    const plantId = req.params.plantId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection("plants").find({ _id: plantId}).toArray();
        if (result.length === 0){
            return res.status(404).json({ status: 404, data: plantId, message: "No plant was found." })
        }
        else {
            const plant = (result[0]);
            return res.status(200).json({ status: 200, data: plant, message:`Plant ID ${plantId}, Common Name ${plant.commonName}` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected");
};


module.exports = {
    getPlants,
    getSinglePlant
}