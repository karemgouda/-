const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");//instead of try and cath
const {validateUpdateBook,validatecreateBook, Book} = require("./models/Book");

router.get("/" , asyncHandler(
async (req,res) => {
    const books =await Book.find().populate("author",["_id","firstName","lastName"]);
    res.status(200).json(books);
}));

router.get("/:id" ,asyncHandler(
async (req,res) => {
    const book = await Books.findById(req.params.id);
    if(book) {
        res.status(200).json(book);
    }
    else{
        res.status(404).json({message: "book not found"});
    }
}));

router.post("/",asyncHandler(
async (req,res) => {
    const {error} = validatecreateBook(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    
    const book = new Book (
        {
            title:req.body.title,
            author:req.body.author,
            description:req.body.description,
            price:req.body.price,
        }
    )
    const result = await book.save(); 
    res.status(201).json(result);
}));

router.put("/:id",asyncHandler(
async (req,res) => {
    const{error} = validateUpdateBook(req.body);

    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    const updateBook = await Book.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            author:req.body.author,
            description:req.body.description,
            price:req.body.price,
        }
    },{ new: true});

    res.status(200).json(updateBook)
}));

router.delete("/:id",asyncHandler(
async (req,res) => {
    const book = await Book.findById(req.params.id);

    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"book has been deleted "});
    }else{
        res.status(404).json({message:"book not found  "});
    } 
}));

module.exports = router;