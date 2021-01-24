const express = require('express');
const router = express.Router();

const URL = require('../../models/schema');

//Test redirect API
router.get('/test', (req,res) => res.json({ msg: "Redirect API is working"}));

//redirect
router.get('/', (req,res) => {
    const hash = req.headers.hash;
    debugger
    URL.findOne({ _id: hash})
        .then((doc) => {
            return res.json({ url: doc.url })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ error : 'Something went wrong'})
        })
})
    
module.exports = router;