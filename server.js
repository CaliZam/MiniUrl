const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


//server init
const app = express();

//Middleware
app.use(bodyParser.urlencoded ({ extended: false}));
app.use(bodyParser.json());
app.use(cors())

//Path
app.get('/', (req,res) => {
    res.send('Home home')
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

const retrieve = require('./routes/api/retrieve');
app.use('/api/retrieve', retrieve); 

app.get('/:hash',  (req, res) => {
    //TODO change hash => shortcode
    const id = req.params.hash;
    URL.findOne({_id: id}, (err, doc) => {
        if(doc){
            //TODO: include or not, http protocol
            console.log(`Adding 1 visit to ${doc.url}`)
            doc.visits++
            doc.lastVisit = Date(Date.now)
            doc.save((err) =>{
                if (err) {
                    return console.error(err);
                }
                res.redirect(doc.url)
            })
            
        } else {
            console.log(err);
        }
    })
    
})


//Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server runing on port ${port}`));