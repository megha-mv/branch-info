import { Server } from "socket.io";

const io = new Server({
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let branchUsers =[];

  const addNewBranch = (pincode,socketId) =>{
      !branchUsers.some((branch)=>branch.pincode === pincode) && 
      branchUsers.push({pincode,socketId});
  }

  const removeBranchUser = (socketId) =>{
      branchUsers = branchUsers.filter(branch=>branch.socketId !== socketId)
  }

  const getBranch = (pincode) =>{
      return branchUsers.find(branch=>branch.pincode === pincode)
  }

  
io.on("connection",(socket)=>{
    console.log("someone is connected")
    socket.on('newBranch',(branchname)=>{
        addNewBranch(branchname,socket.id) 
    })

    socket.on('sendNotification',({senderName,receiverName,msg})=>{
        const receiver = getBranch(receiverName) 
        io.to(receiver.pincode).emit("getNotification",{
            senderName,
            msg
        })       
    })
    io.emit("getNotifications","Hello to the branch manager");


    socket.on("disconnect", ()=>{
        console.log("somone has disconnected");
        removeBranchUser(socket.pincode);
    });
});

io.listen(5000);