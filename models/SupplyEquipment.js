const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Supply = mongoose.model(supplySchema);
module.exports = Supply;
