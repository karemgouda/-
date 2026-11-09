const mongoose = require("mongoose");
const Joi = require('joi');

const UserScheama = new mongoose.Schema({  
    email: {
         type: String,
        required: true,
        minlength:5,
        maxlength:100,
        unique:true,
         },
         username:{
            type: String,
            required: true,
            minlength:3,
            maxlength:100,
         },
         password: { 
            type: String,
            required: true,
            minlength:8, 
        },
    });
    const User =mongoose.model("User",UserScheama);

    function validateRegisterUser(obj){
        const schema = Joi.object({
            email: Joi.string().min(5).max(100).required().email(),
            username: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(8).required(),
        });
        
        return schema.validate(obj);
        
        }

    function validateLoginUser(obj){
        const schema = Joi.object({
            email: Joi.string().min(5).max(100).required().email(),
            password: Joi.string().min(8).required(),
        });
        
        return schema.validate(obj);
        
        }

    function validateUpdateUser(obj){
        const schema = Joi.object({
            email: Joi.string().min(5).max(100).email(),
            username: Joi.string().min(3).max(100),
            password: Joi.string().min(8)
    });
    
    return schema.validate(obj);
    
    }
    
    module.exports ={
        User,
        validateLoginUser,
        validateRegisterUser,
        validateUpdateUser,
    }
    