// controllers/foods.js

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
  try{
    const currentUser = await User.findById(req.session.user._id)
    // console.log(currentUser.pantry)
    res.render('foods/index.ejs',{pantry: currentUser.pantry});
  } catch(error){
    console.log({error})
    console.log(error.message)
    res.redirect("/")
  }
  });

  router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });

  router.post('/', async (req,res)=>{
    try{
      const addedFood = await User.findByIdAndUpdate(req.session.user._id, {$push: {pantry: req.body}})
      res.redirect(`/users/${req.session.user._id}/foods`);
    } catch(error){
      console.log({error})
      console.log(error.message)
      res.redirect("/")

    }
  })

  router.get('/:itemId', async (req,res)=>{
    try{
      const currentUser = await User.findById(req.session.user._id)
      const pantry = currentUser.pantry.id(req.params.itemId)
      res.render('foods/showToEdit.ejs', {pantry})

    } catch(error){
      console.log({error})
      console.log(error.message)
      res.redirect("/")
    }
  })

  router.delete('/:itemId', async (req,res)=>{
    try{
      const currentUser = await User.findById(req.session.user._id);
      currentUser.pantry.id(req.params.itemId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${req.session.user._id}/foods`);

    } catch(error){
      console.log({error})
      console.log(error.message)
      res.redirect("/")
    }
  })

  router.put('/:itemId', async (req,res)=>{
    try{
      const currentUser = await User.findById(req.session.user._id);
      const pantry = currentUser.pantry.id(req.params.itemId)
      console.log(pantry)
      console.log(req.body)

      pantry.set(req.body)
      console.log(pantry)

      await currentUser.save()
      // res.render('foods/showToEdit.ejs', {pantry});
      res.redirect(`/users/${req.session.user._id}/foods`);

    } catch(error){
      console.log({error})
      console.log(error.message)
      res.redirect("/")
    }
  })


  

module.exports = router;
