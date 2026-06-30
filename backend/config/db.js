const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            socketTimeoutMS: 60000,
        });
        console.log("MongoDB Connected");
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;