const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");//instead of try and cath
const { Author,validateUpdateAuthor,validatecreateAuthor} = require("./models/Author");

router.get("/" ,asyncHandler( 
    async (req,res) => {
            const authorList = await Author.find().sort({firstName: 1});
            res.status(200).json(authorList);
    }
));

router.get("/:id" ,asyncHandler( 
    async (req,res) => {
            const author  = await Author.findById(req.params.id);
            if(author ) {
                res.status(200).json(author );
            }
            else{
                res.status(404).json({message: "author  not found"});
            }
        
 
    }
));

router.post("/", asyncHandler(
async (req,res) => {
    const {error} = validatecreateAuthor (req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
        const author  = new Author({  
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            nationality:req.body.nationality,
            image:req.body.image,
        });
        const result = await author.save();
        res.status(201).json(result);
    
    }
));
    
router.put("/:id",asyncHandler( 
async (req,res) => {
    const{error} = validateUpdateAuthor (req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
        const author = await Author.findByIdAndUpdate(req.params.id,{
            $set: {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                nationality:req.body.nationality,
                image:req.body.image,
        }
    },{new: true });
    res.status(200).json(author);
    }
));


router.delete("/:id",asyncHandler( 
async (req,res) => {
    const author = await Author.findById(req.params.id);
    if(author){
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"author has been deleted "});
    }else{
        res.status(404).json({message:"author not found  "});
    }
    }
));

module.exports = router;