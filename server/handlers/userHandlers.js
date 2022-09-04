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

// IF USER EXISTS, RETURNS USER DATA - IF USER DOESN'T EXIST, CREATES USER AND RETURNS DATA
// .post("/api/login-user", loginUser)
const loginUser = async (req, res) => {

    const { given_name, family_name, email } = req.body;
    const id = uuidv4(); 
    const newUser = {
        _id: id,
        dateJoined: moment().format(),
        given_name: given_name,
        family_name: family_name,
        email: email,
        houseplants: [],
        home: [ 
            {"bathroom": "Bathroom"},
            {"basement": "Basement"},
            {"bedroom": "Bedroom"}, 
            {"entrance": "Entrance"},
            {"kitchen": "Kitchen"}, 
            {"livingRoom": "Living room"}, 
            {"office": "Office"},
            {"studio": "Studio"},
            {"tvRoom": "TV room"},  
            {"other": "Other"}
        ],
    }

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db();

        // CHECK IF USER ALREADY EXISTS
        const checkUser = await db.collection("users").findOne({ email: email })
        if (checkUser) {
            // IF USER EXISTS, RETURN USER DATA
            return res.status(200).json({ status: 200, success: true, data: checkUser, message: `Returned existing user data for user: ${checkUser._id}` })
        }
        else {
            // IF USER DOES NOT EXIST, ADD USER DATA TO USERS COLLECTION AND RETURN NEW USER
            await db.collection("users").insertOne(newUser);
            res.status(201).json({ status: 201, success: true, data: newUser, message: `Created new user ${newUser._id}` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};


// DELETES A SPECIFIED USER
// .delete("/api/delete-user/:userId", deleteUser)
const deleteUser = async (req, res) => {

    const userId = req.params.userId;
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
            // IF USER EXISTS, DELETE USER
            await db.collection("users").deleteOne({ _id: userId});
            res.status(200).json({ status: 200, success: true, message: `Deleted user ${userId}` })
        }
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
    client.close();
    console.log("disconnected!");
};

module.exports = {
    getUser,
    loginUser,
    deleteUser,
}