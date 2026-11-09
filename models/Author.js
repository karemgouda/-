 const { types, string } = require("joi");
 const mongoose = require("mongoose");
 const Joi = require('joi');
 
const AuthorSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        minlength:3,
        maxlength:200,
    },
    lastName:{
        type: String,
        require: true,
        minlength:3,
        maxlength:200,
    },
    nationality:{
        type: String,
        require: true,
        minlength:2,
        maxlength:200,
     },
     image:{
       type: String,
        default:"default-avatar.png"
    },
 });

const Author = mongoose.model("Author", AuthorSchema);

function validatecreateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        nationality: Joi.string().min(3).max(300).required(),
        image: Joi.string()
        
    });
    
    return schema.validate(obj);
    
    }
    
    function validateUpdateAuthor(obj){
        const schema = Joi.object({
            firstName: Joi.string().min(3).max(100),
            lastName: Joi.string().min(3).max(300),
            nationality: Joi.string().min(3).max(200),
            image: Joi.string()
        });
        
        return schema.validate(obj);
        
        }
    

module.exports ={
    Author,
    validateUpdateAuthor,
    validatecreateAuthor
}