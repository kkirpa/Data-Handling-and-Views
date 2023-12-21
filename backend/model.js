/*
 * Project 2
 * model back-end JavaScript code
 *
 * Author: Denis Gracanin
 * Editor: Kirpa Kaur
 * Version: 2.0
 */

// Import mongoose library
const mongoose = require('mongoose');

// Create schema
const CS3744Schema = new mongoose.Schema({
    fileName: String,
    fileContent: {
        type: Object,
        properties: {
            title: String,
            data: {
                type: Array,
                items: {
                    type: Object
                }
            }
        }
    },
}, {versionKey: false});


// Export schema
module.exports = mongoose.model('P2Datasets', CS3744Schema, 'P2Datasets');
