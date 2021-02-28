const express = require("express");
const ejsLayout = require('express-ejs-layouts');
const app = express();

app.use(express.urlencoded({ extended: false }))

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

// use Template engine
app.use(ejsLayout);
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});
app.use('/', require('./routes/content'));
app.use('/', (req, res) => res.render('render'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));



