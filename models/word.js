/**
 * Module dependencies.
 */
var mongoose = require('../db/mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    transcription: {
        type: String
    },
    translations: {
        type: Array,
        required: true
    },
    speechPart: {
        type: Number,
        min: 0,
        max: 11
    },
    img: {
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
    units: [{
        type: ObjectId,
        ref: 'Unit'
    }]
});

schema.index({'units': 1});

exports.Word = mongoose.model('Word', schema);