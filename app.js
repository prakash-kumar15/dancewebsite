const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3000;

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    concern: String,
});

const contact = mongoose.model('contact', contactSchema);


app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/login', (req, res) => {
    const params = {}
    res.status(200).render('login.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        // console.log("myData:",myData);
        res.send('This item has been saved to the database')
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    });
//     res.status(200).render('contact.pug', params);
 })








// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});