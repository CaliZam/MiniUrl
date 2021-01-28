const express = require('express');
const router = express.Router();


const URL = require('../../models/schema');

//Test redirect API
router.get('/test', (req, res) => res.json({ msg: "Retrieve API is working" }));


//retrieve
router.get('/:shortcode?/stats', (req, res) => {
    try {
        const id = req.params.shortcode;

         URL.findOne({ shortcode: id })
            .then((doc) => {
                console.log(doc);
                return res.json(doc)
            })
            .catch(err => {
                return res.status(400).json({ error: 'Something went wrong' })
            })
    }
    catch {

    }

})

module.exports = router;
