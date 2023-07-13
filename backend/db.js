const mongoose=require("mongoose");
const mongoURI="mongodb://0.0.0.0:27017/inotebook"


const connetToMongo= () =>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to Mongoose Sucessfully");
    })
    .catch((err)=>{
         console.log(err);
    })
}


module.exports=connetToMongo;