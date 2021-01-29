const express = require('express');
const router = express.Router();
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
        const resultCreate = await URL.create({url: urlQuery, shortcode: shortcode})
        if(resultCreate){
            res.status(201).send(resultCreate.shortcode)
        }
    }catch(error){
        res.status(400).send(error.message)
    }
    
})

router.post('/:url?', async (req, res) => {
    try {
        const customCode = req.body.code
        const urlQuery = req.query.url
        let customCodeCheck = customCode.match(/[a-zA-Z0-9]{4,20}/g)

        if(!customCodeCheck) throw new Error('the code has to conatain at least 4 characters')
        
        const [codeResult] = await URL.find({ shortcode: customCode })
        if (codeResult) {
            throw new Error(`This code alredy exist! for url: ${codeResult.url}`)
        }
        const [urlResult] = await URL.find({ url: urlQuery })
        if (urlResult) {
            throw new Error(`This ${urlQuery} alredy exist! with code: ${urlResult.shortcode}`)
        }
        const resultCreate = await URL.create({url: urlQuery, shortcode: customCode})
        if (resultCreate) {
            res.status(201).send({url, shortcode} = resultCreate)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

})
 


module.exports = router;