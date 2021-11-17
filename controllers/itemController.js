const Item = require('../models/Item');

//lista svih itema iz baze

const get_items = async (req, res) => {
  try {
    const getAllItems = await Item.find().exec();
    res.status(200).json(getAllItems);
  } catch (error) {
    console.log({ message: error });
  }
};

const get_single_item = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleItem = await Item.findById(id).exec();
    const result = getSingleItem;
    res.status(200).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

//dodavanje opreme u bazu
const add_item = async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      equipmentNumber: req.body.equipmentNumber,
    });
    const result = await newItem.save();
    res.status(200).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

//update opreme
const update_item = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const equipmentNumber = req.body.equipmentNumber;
    const quantity = req.body.quantity;

    const update = await Item.findById(id);
    update.name = name;
    update.equipmentNumber = equipmentNumber;
    update.quantity = quantity;

    const updated = await update.save();
    res.status(201).json(updated);
  } catch (error) {
    console.log({ message: error });
  }
};

//brisanje opreme iz baze

const delete_item = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteItem = await Item.findByIdAndDelete(id);
    res.status(200).json(deleteItem)
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = {
  add_item,
  update_item,
  get_items,
  delete_item,
  get_single_item,
};
