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

// IMPORT PLANTS
const plants = require("./data/plants.json")

// ADD PLANTS TO DB
const importPlants = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const db = client.db("");
        await client.connect();
        await db.collection("plants").insertMany(); //Add plants
        console.log("success!");
    }

    catch(err) {
        console.log("Something went wrong: " + err );
    }

    client.close();
    console.log("disconnected!");
}

importPlants();