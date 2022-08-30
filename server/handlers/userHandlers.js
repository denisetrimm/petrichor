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

// RETURNS A SINGLE USER
// .get("/api/get-user/:userId", getUser)
const getUser = async (req, res) => {

    const userId = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection("users").find({ _id: userId}).toArray();
        if (result.length === 0){
            return res.status(404).json({ status: 404, data: userId, message: "No user was found." })
        }
        else {
            const user = (result[0]);
            return res.status(200).json({ status: 200, data: user, message:`User ID ${userId}` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected");
};

module.exports = {
    getUser
}