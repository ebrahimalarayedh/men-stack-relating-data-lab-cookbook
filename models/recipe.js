const {Schema, model} = require("mongoose")


const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    instructions: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ingredients: {
        type: [Schema.Types.ObjectId],
        ref: "Ingredient"
    }
})

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe