const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const User = require("../models/user")
const Ingredient = require("../models/ingredient")
const Recipe = require("../models/recipe")

//index
router.get("/", async (req,res)=>{
    try{
        
        res.render('recipes/index.ejs')
    }catch(err){

    }
})

//new
router.get("/new", async (req,res)=>{
    try{
        const fetchedIngredients = await Ingredient.find()
        res.render('recipes/new.ejs', {ingredients: fetchedIngredients})
    }catch(err){
        
    }
})

//create
router.post("/", async (req,res)=>{
    console.log(req.body)
    try{
        const createdRecipe = await Recipe.create({
            name: req.body.name,
            instructions: req.body.instructions,
            owner: req.session.user,
            ingredients:  Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]
        })
        res.redirect('/recipes')
    }catch(err){
            res.status(400).send('Error creating recipe')        
    }
})

//show
router.get("/:recipeId", async (req,res)=>{
    try{

    }catch(err){
        
    }
})

//edit
router.get("/:recipeId/edit", async (req,res)=>{
    try{

    }catch(err){
        
    }
})

//update
router.put("/:recipeId", async (req,res)=>{
    try{

    }catch(err){
        
    }
})

//delete
router.delete("/:recipeId", async (req,res)=>{
    try{

    }catch(err){
        
    }
})



module.exports = router