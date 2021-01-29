const express = require('express');
const router = express.Router();


router.get('/:shortcode',  (req, res) => {
    const id = req.params.shortcode;
    URL.findOne({shortcode: id}, (err, doc) => {
        if(doc){
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

module.exports= router;

