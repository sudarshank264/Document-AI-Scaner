
const mongoose =require("mongoose");

require('dotenv').config();

const connec =async()=>{
    try {
        const a = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected");
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = connec;