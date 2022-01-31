const mongoose = require("mongoose")
const validator = require("validator")

const branchSchema =new mongoose.Schema({ 
    branchName: {
        type:String,
        required:true,
    },
    pincode: {
        type:Array,
        required:true},
    place: String,
    userName:String,
    email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                    throw new Error("Invalid Error")
            }
        }
     },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
 })

 //define model which is new collection
 const Branchlist = new mongoose.model("Branchlist",branchSchema);

 //export collection
 module.exports = Branchlist;

 