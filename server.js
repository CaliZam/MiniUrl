const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// //Models
// const URL = require('./models/schema')

//server init
const app = express();

//Middleware
app.use(bodyParser.urlencoded ({ extended: false}));
app.use(bodyParser.json());

//Path
app.get('/', (req,res) => {
    res.send('Home')
})

//Database uri
const db = require('./config/uri').mongoURI;

//Conect DB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('MongoDB on'))
    .catch(err => console.log(err)); 

//Endpoints
const shorter = require('./routes/api/shorter');
app.use('/api/shorter', shorter);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect); 

app.get('/:hash',  (req, res) => {
    const id = req.params.hash;
    //TODO: create complete redirect
})


//Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server runing on port ${port}`));