const express = require('express');
const router = express.Router();


const URL = require('../../models/schema');

//Test redirect API
router.get('/test', (req, res) => res.json({ msg: "Retrieve API is working" }));


//retrieve
router.get('/:shortcode?', async (req, res) => {
    try {
        const id = req.params.shortcode;

        let customCodeCheck = id.match(/[a-zA-Z0-9]{4,20}/g)
        if (!customCodeCheck) throw new Error('the code has to conatain at least 4 characters');

        const foundShortcode = await URL.findOne({ shortcode: id })
        if (!foundShortcode) {
            throw new Error(`Any url with code ${id} was found`)
        } else {
            return res.json(foundShortcode)
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }

})

module.exports = router;
