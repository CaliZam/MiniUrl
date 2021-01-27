const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

//URL model
const URL = require('../../models/schema');

//Cors Policy control  
router.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//test GET
//acces public
router.get('/test', (req, res) => res.json({ msg: 'API is online' }));


// function generateRandomChar() {
//     var possibleChars = "abcdegfghijkmnlopqrst0123456789";
//     var rand = Math.random() * possibleChars.length;
//     return possibleChars[parseInt(rand)];
//   }


//POST
//access public
router.post('/', (req, res) => {

    if (req.body.url) {
        urlData = req.body.url
        userDefinedShortcode = req.body.optionalShortCode
    }
    console.log('URL is: ', urlData);

    //then check if URL already exist, then retrieve it
    URL.findOne({ url: urlData }, (err, doc) => {
        if (err) {
            return console.log(error)
        }
        else if (doc) {
            return res.send(doc);
        } else {
            //create the shortcode using the rand method above
            // ENSURE THIS NEW SHORTCODE DOES NOT EXIST IN THE DB
            console.log('new URL');
            const webDoc = new URL({
                //TODO: change the unique ID for 6 characters or 4 if is from user
                _id: uniqid(),
                url: urlData,
            })
            webDoc.save((err) => {
                if (err) {
                    return console.error(err);
                }
                else {
                    res.send ({
                        url: urlData,
                        hash: webDoc._id,
                        status: 200,
                        statusResponse: 'URL created'
                    })
                }
            }
            )
        }
    });

})

module.exports = router;