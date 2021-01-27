const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create new Schema
const urlSchema = new Schema({

    url: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    },

    hash: {
        type: String
    },

    visits: {
        type: Number,
        default: 0
    },

    lastVisit: {
        type: Date
    },

    shortcode: {
        type: String,
        required: true
    }

});

module.exports = URL = mongoose.model('URL', urlSchema);

