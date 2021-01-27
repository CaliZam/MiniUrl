const express = require('express');
const router = express.Router();


router.get('/:hash',  (req, res) => {
    //TODO change hash => shortcode
    const id = req.params.hash;
    URL.findOne({shortcode: shortcode}, (err, doc) => {
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

module.exports= router;
