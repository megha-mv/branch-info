const express = require('express');
require("./db/db")
const Branchlist = require("./models/branches")
const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;


//create a new branch or register a branch ---->create API to register a branch

app.post("/branches", async (req,res) =>{
    console.log(req.body);
    //This can be seen only on click of send button in postman

    const {branchName,pincode,place,userName,email,password,cpassword} = req.body;

    if(!branchName || !pincode || !place || !email || !password || !cpassword){
        return res.status(422).json({error : "Please fill details correctly"})
    }

    try{
        const branchExist  = await Branchlist.findOne({email: email});

        if(branchExist){
            return res.status(422).json({error:"Email already exists"});
        }else if(password !== cpassword){
            return res.status(422).json({error:"Password are not matching"});
        }else{
            const branch = new Branchlist({branchName,pincode,place,userName,email,password,cpassword})
            //this is to save the document(row) in the collection(table)
            await branch.save();
            return res.status(201).json({error:"Branch Registered Successfully"});    
        } 
    }catch(err){
            console.log(err);
        }
});

//read all the  branch data
app.get("/branches",async(req,res) =>{

    try{
       const branchesInfo = await Branchlist.find();
       res.send(branchesInfo)
    }catch(e){
        res.send(e);
    }
})

//Login validation or check login successful
app.post("/login", async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill details provided"})
        }

        const userLogin = await Branchlist.findOne({email:email});

        if(userLogin){
            if(password !== userLogin.password){
                return res.status(400).json({error:"password is incorrect"})                
            }else{
                return res.json({message:"login success"})
            }
        }       

        // console.log(`${email} and password entered is ${password}`);

    } catch (error) {
        res.status(400).send("invalid email and password")
    }
})



app.listen(port,()=>{
    console.log(`connection is connected at ${port}`);
})

