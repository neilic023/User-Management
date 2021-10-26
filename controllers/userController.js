const User = require('../models/User');
const Item = require('../models/Item');
const Supply = require('../models/SupplyEquipment');

//create user

//get users
const get_users = async (req, res) => {
  try {
    const getAllUsers = await User.find().exec();
    res.status(200).json(getAllUsers);
  } catch (error) {
    console.log({ message: error });
  }
};

//get specific user
const get_specific_user = async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await User.findById(id).exec();
    res.status(200).json(getUser);
  } catch (error) {
    console.log({ message: error });
  }
};

//update user
const update_user = async (req, res) => {
  try {
    const id = req.params.id;
    const fullName = req.body.fullName;
    const email = req.body.email;

    const update = await User.findById(id).exec();
    update.fullName = fullName;
    update.email = email;

    const saveUpdated = await update.save();
    res.status(201).json(saveUpdated);
  } catch (error) {
    console.log({ message: error });
  }
};

//delete user

const delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    const removeUser = await User.findByIdAndDelete(id);
    res.status(200).send(`${removeUser.fullName} is deleted from database`);
  } catch (error) {
    console.log({ message: error });
  }
};

//adduj item useru,  evidencija koji korisnik ima koju opremu i ifelse za dodavanje quantity na itemu u kod usera

const add_user_item = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;
    const user = await User.findById(userId).exec();
    const item = await Item.findById(itemId).exec();
    const userItem = user.items.find(
      item => item._id.toString() === itemId.toString()
    );
    if (userItem && userItem._id.toString() === itemId.toString()) {
      userItem.quantity += 1;
      console.log('res2');
    } else {
      const newItem = item;
      newItem.quantity = 1;
      user.items.push(newItem);
      console.log('res1');
    }
    item.quantity -= 1;
    await item.save();
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

// brisanje sve opreme useru
const delete_user_item = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;
    const updateUser = await User.findById(userId).exec();
    const updateUserItem = await updateUser.items.filter(item => {
      return item._id.toString() !== itemId.toString();
    });
    console.log(updateUserItem);
    updateUser.items = updateUserItem;
    const result = await updateUser.save();
    res.json(result).status(200);
  } catch (error) {
    console.log({ message: error });
  }
};

//user supply request
const request_equipment = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = new Supply({
      name: req.body.name,
      quantity: req.body.quantity,
      user: id,
    });
    const result = await equipment.save();
    res.status(200).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

//admin view of user equipment requests
const view_requests = async (req, res) => {
  try {
    const id = req.params.id;
    const getRequests = await Supply.findById(id).populate('user');
    const result = getRequests;
    res.status(200).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = {
  get_users,
  update_user,
  get_specific_user,
  delete_user,
  add_user_item,
  delete_user_item,
  request_equipment,
  view_requests,
};
