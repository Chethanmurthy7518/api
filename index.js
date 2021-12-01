const express = require('express')
require('dotenv').config()

const cors = require('cors')


//DB Connection
require('./config/dataBase.js')


//Product Routes
const productRoutes = require('./routes/products')

//user Routes
const userRoutes = require('./routes/users')



const app = express()

const PORT = process.env.PORT || 2000

//body parser Midleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors())
//router middelware
app.use('/products',productRoutes)
app.use('/users', userRoutes)

//cors 

// app.get('/test',(req,res)=>{
//     res.send("HOME")
// })


//error Handling
app.use((err,req,res,next)=>{
    res.status(500).json({
        error:true,
        message:err.message,
        data:null
    })
})

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})