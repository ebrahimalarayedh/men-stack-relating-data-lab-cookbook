const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const User = require("../models/user")
const Ingredient = require("../models/ingredient")

//index
router.get("/", async (req, res) => {
    try {

    } catch (err) {

    }
})

//new
router.get("/new", async (req, res) => {
    try {

    } catch (err) {

    }
})

//create
router.post("/", async (req, res) => {
    console.log("BODY RECEIVED:", req.body)
    try {
        const newIngredient = new Ingredient({ name: req.body.name })
        await newIngredient.save()
        res.status(201).json(newIngredient)
    } catch (err) {
        console.error("ERROR CREATING INGREDIENT:", err)
        res.status(400).json({ message: 'Error creating ingredient' })
    }
})

//create for bulk
router.post('/bulk', async (req, res) => {
  try {
    const names = req.body.names.map(name => name.trim().toLowerCase());
    const existingIngredients = await Ingredient.find({ name: { $in: names } });

    const existingNames = existingIngredients.map(ing => ing.name.toLowerCase());

    const newNames = names.filter(name => !existingNames.includes(name));
    const newIngredients = await Ingredient.insertMany(
      newNames.map(name => ({ name }))
    );

    res.status(201).json([...existingIngredients, ...newIngredients]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add ingredients' });
  }
});

//show
router.get("/:recipeId", async (req, res) => {
    try {

    } catch (err) {

    }
})

//edit
router.get("/:recipeId/edit", async (req, res) => {
    try {

    } catch (err) {

    }
})

//update
router.put("/:recipeId", async (req, res) => {
    try {

    } catch (err) {

    }
})

//delete
router.delete("/:recipeId", async (req, res) => {
    try {

    } catch (err) {

    }
})



module.exports = router