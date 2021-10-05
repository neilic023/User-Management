const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    equipmentNumber: {
      type: Number,
      required: true,
      min: 9,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
