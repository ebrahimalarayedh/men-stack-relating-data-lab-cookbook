const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const passUrlToView = require('./middleware/pass-Url-ToView.js')

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const userController = require("./controllers/users.js")
const recipesController = require("./controllers/recipes.js")
const ingredientsController = require('./controllers/ingredients.js');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});


app.use(passUserToView);
app.use(passUrlToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use("/users", userController)
app.use('/users/:userId/foods', foodsController)
app.use("/recipes", recipesController)
app.use('/ingredients', ingredientsController);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
