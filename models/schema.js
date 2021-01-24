const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create new Schema
const urlSchema = new Schema({
    _id: { 
        type: String
    },

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

    visitis: {
        type: Number
    }

});

module.exports = URL = mongoose.model('URL', urlSchema);

