const { types, required } = require("joi");
const Joi = require('joi');
const mongoose = require("mongoose");


const BookScheama = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
});

const Book =mongoose.model("Book",BookScheama);

function validatecreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        author: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
    });
    
    return schema.validate(obj);
    
    }
    
    function validateUpdateBook(obj){
        const schema = Joi.object({
            title: Joi.string().min(3).max(200),
            author: Joi.string(),
            description: Joi.string(),
            price: Joi.number().min(0),
        });
        
        return schema.validate(obj);
        
        }

module.exports ={
    Book,
    validatecreateBook,
    validateUpdateBook,
}
