const mongoose = require('mongoose')


const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("DB Connection Successfull");
    }else{
        console.log("DB Connection Failed");
    }
})