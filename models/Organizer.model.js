const { mongoose, Schema, model } = require('mongoose');

const organizerSchema = new Schema(
  {
    title: String,
    description: String,
    rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Organizer', organizerSchema);
