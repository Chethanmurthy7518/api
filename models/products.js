const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    pName:{
        type:String,
        required:true,
        minlength:1,
        maxlength:100
    },
    pPrice:{
        type:Number,
        required:true,
        min:1,
        max:1000000
    },
    pImage:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1000
    },
    pDesc:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },

})

module.exports = mongoose.model('products',productSchema)