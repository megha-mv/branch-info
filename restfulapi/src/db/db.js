const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/branchDetails-api",{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => console.log("Connection successfull"))
.catch((err) => console.log("Connection is not successfull"));