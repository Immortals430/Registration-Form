import mongoose from "mongoose";
const DB = process.env.DB || "mongodb://127.0.0.1/registration_form"

const connectDb = async ()=> {
    try{
        await mongoose.connect(DB);
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log(err)
    }
}

export default connectDb;
