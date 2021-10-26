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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
const Supply = mongoose.model('Supply', supplySchema);
module.exports = Supply;
