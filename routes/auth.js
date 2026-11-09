const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{validateRegisterUser,validateLoginUser, User} = require("./models/User");


router.post("/", asyncHandler(
    async (req,res) => {
        const {error} = validateRegisterUser (req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({message:"this user already registered"});
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        user = new User({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,

        });
            const result = await user.save();
            res.status(201).json(result);
             //const token = jwt.sign({id: user._id, username: user.username},"secretkey");
            // const {password, other} = result._doc;
            // res.status(201).json( other , token);
        
        }),
    );

    router.post("/:login", asyncHandler(
        async (req,res) => {
            const {error} = validateLoginUser (req.body);
            if(error){
                return res.status(400).json({message:error.details[0].message});
            }
            let user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(400).json({message:"invalid password or password"});
            }
            const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);

            if(!isPasswordMatch){
                return res.status(400).json({message:"invalid password or password"});
            }
             // const token = jwt.sign({id: user._id, username: user.username },process.env.JWT_SECRET_KEY);
            //const token = jwt.sign({id: user._id, username: user.username},"secretkey");
            // const {password, other} = result._doc;
            // res.status(201).json( other , token);
        
            const result = await user.save();
            res.status(200).json(result);
                
            
            }),
        );

module.exports = router;