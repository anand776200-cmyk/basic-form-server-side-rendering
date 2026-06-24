const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/signInRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/demoAuth');
app.listen(3000, () => {
    console.log('connected...');
})

app.set('view engine', 'ejs');

