const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const contactRoute = require('./routes/contact');

mongoose.connect('mongodb+srv://rahulapp:app%40123@app1.utcifvu.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=app1')
  .then(() => console.log("Connected to database"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/contact', contactRoute);

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Bad request' });
});

module.exports = app;
