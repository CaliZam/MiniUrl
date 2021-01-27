const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const generateRandomChar = require('../../utils/generator-random')
//URL model
const URL = require('../../models/schema');

//test GET
//acces public
router.get('/test', (req, res) => res.json({ msg: 'API is online' }));




//POST
//access public
router.get('/:url?', async (req, res) => {
    try{
        const urlQuery = req.query.url
        const [result] = await URL.find({url:urlQuery})
        if(result){
            throw new Error(`This ${urlQuery} alredy exist! with code: ${result.shortcode}`)
        }
        let shortcode = generateRandomChar()
        //TODO: method to avoid duplicate codes
        // const finalShortcode = await URL.findOne({shortcode: shortcode})
        // if(!finalShortcode){}
        const resultCreate = await URL.create({url: urlQuery, shortcode: shortcode})
        if(resultCreate){
            res.status(201).send(resultCreate.shortcode)
        }
    }catch(error){
        res.status(400).send(error.message)
    }
    
})


module.exports = router;