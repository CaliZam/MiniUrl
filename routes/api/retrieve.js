const express = require('express');
const router = express.Router();


const URL = require('../../models/schema');

//Test redirect API
router.get('/test', (req,res) => res.json({ msg: "Retrieve API is working"}));


//retrieve
router.get('/', (req,res) => {
    const shortcode = req.params.shortcode;
   
    URL.findOne({ _id: shortcode})
        .then((doc) => {
            return res.json(doc)
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ error : 'Something went wrong'})
        })
})
    
module.exports = router;
