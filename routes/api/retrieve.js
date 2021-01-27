const express = require('express');
const router = express.Router();


const URL = require('../../models/schema');

//Test redirect API
router.get('/test', (req,res) => res.json({ msg: "Retrieve API is working"}));

//cors policy control
router.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//retrieve
router.get('/', (req,res) => {
    //TODO change hash => shortcode
    const hash = req.params.hash;
    URL.findOne({ _id: hash})
        .then((doc) => {
            return res.json(doc)
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ error : 'Something went wrong'})
        })
})
    
module.exports = router;
