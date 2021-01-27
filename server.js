const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const retrieve = require('./routes/api/retrieve');
const shorter = require('./routes/api/shorter');
const shortcode = require('./routes/api/hash');
require('dotenv/config');
const {env:{PORT,MONGODB_URL}} = process;



//Conect DB
console.info('Conecting...')
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Conected with mongoDB')
    app.use(cors())
    app.use(bodyParser.urlencoded ({ extended: false}));
    app.use(bodyParser.json());
    
    //Call routes
    app.use('/', shortcode); 
    app.use('/api/shorter', shorter);
    app.use('/api/retrieve', retrieve); 
    
    app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
    })
    .catch(err => {
        console.error('Error conecting dataBase', err.message)
    })
       
