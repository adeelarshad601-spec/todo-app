const mongoose = require('mongoose')
// require('dotenv').config();

const ConnectDB = async ()=>{
    try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed:", error.message);
  }
}


module.exports = ConnectDB