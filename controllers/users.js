const router = require("express").Router()

const User = require("../models/user")

router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find()
        res.render('users/index.ejs', { allUsers })
    } catch (error) {
        console.log({ error })
        console.log(error.message)
        res.redirect("/")
    }


})

router.get("/show/:id", async (req, res) => {
    try {
        const pointedUser = await User.findById(req.params.id)
        res.render('users/show.ejs', { pointedUser })
    } catch (error) {
        console.log({ error })
        console.log(error.message)
        res.redirect("/")
    }


})

module.exports = router















module.exports = router