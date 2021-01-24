const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

//URL model
const URL = require('../../models/schema');

//test GET
//acces public
router.get('/test', (req, res) => res.json({ msg: 'API is online' }));

//POST
//access public
router.post('/', (req, res) => {

    if (req.body.url) {
        urlData = req.body.url
    }
    console.log('URL is: ', urlData);

    //then check if URL already exist, then retrieve it
    URL.findOne({ url: urlData }, (err, doc) => {
        if (err) {
            return console.log(error)
        }
        else if (doc) {
            console.log('URL already exist');
        } else {
            console.log('new URL');
            const web = new URL({
                _id: uniqid(),
                //TODO: change the unique ID for 6 characters or 4 if is from user
                url: urlData,
            })
            web.save((err) => {
                if (err) {
                    return console.error(err);
                }
                else {
                    res.send ({
                        url: urlData,
                        hash: web._id,
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