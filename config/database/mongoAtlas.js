const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')

const connectDB = async ()=>{
    console.log(db)
    try{
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log("Connected")
    }
    catch(e){
        console.log(e.message);
        process.exit(1)
    }
};

module.exports = connectDB;