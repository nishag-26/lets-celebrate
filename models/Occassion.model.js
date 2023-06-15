const { Schema, model } = require('mongoose');

const occassionSchema = new Schema(
    {
        title: String,
        date: String,
            description: String
        },
    {
      timestamps: true
    }
);

module.exports = model('Occassion', occassionSchema);