const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const User = require("../models/user")
const Ingredient = require("../models/ingredient")
const Recipe = require("../models/recipe")

//index
router.get("/", async (req, res) => {
    const user = req.session.user
    try {
        const allMyRecipes = await Recipe.find({ owner: user._id }).populate('ingredients');
        res.render('recipes/index.ejs', { recipes: allMyRecipes });

    } catch (err) {
        console.error('Error fetching user recipes:', err);
        res.status(500).send('Internal Server Error');
    }
})

//new
router.get("/new", async (req, res) => {
    try {
        const fetchedIngredients = await Ingredient.find()
        res.render('recipes/new.ejs', { ingredients: fetchedIngredients })
    } catch (err) {

    }
})

//create
router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const createdRecipe = await Recipe.create({
            name: req.body.name,
            instructions: req.body.instructions,
            owner: req.session.user,
            ingredients: Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]
        })
        res.redirect('/recipes')
    } catch (err) {
        res.status(400).send('Error creating recipe')
    }
})

//show
router.get("/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await Recipe.findById(recipeId).populate("ingredients");
        if (!recipe) return res.status(404).send("Recipe not found");
        res.render("recipes/show.ejs", { recipe });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

//edit
router.get("/:recipeId/edit", async (req, res) => {
    const { recipeId } = req.params;
    const user = req.session.user;

    try {
        const recipe = await Recipe.findById(recipeId).populate("ingredients owner");

        if (!recipe) {
            return res.status(404).send("Recipe not found.");
        }

        if (!recipe.owner._id.equals(user._id)) {
            return res.status(403).send("Unauthorized to edit this recipe.");
        }

        const allIngredients = await Ingredient.find({});
        res.render("recipes/edit.ejs", { recipe, allIngredients });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading edit form.");
    }
})

//update
router.put("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { name, instructions, ingredients } = req.body;
        const user = req.session.user;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).send("Recipe not found");
        if (recipe.owner.toString() !== user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        recipe.name = name;
        recipe.instructions = instructions;
        recipe.ingredients = Array.isArray(ingredients) ? ingredients : [ingredients];
        await recipe.save();

        res.redirect(`/recipes/${recipeId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

//delete
router.delete("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const user = req.session.user;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).send("Recipe not found");
        if (recipe.owner.toString() !== user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        await recipe.deleteOne();
        res.redirect("/recipes");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})



module.exports = router