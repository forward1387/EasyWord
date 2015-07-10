/**
 * Module dependencies.
 */
var mongoose = require('../db/mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    title       : {
        type: String,
        required: true,
        unique : true
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    words       : [{type: ObjectId, ref: 'Word'}]
});

schema.index({'words': 1});

exports.Unit = mongoose.model('Unit', schema);