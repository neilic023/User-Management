const User = require('../models/User');
const Item = require('../models/Item');

//create user
const create_user = async (req, res) => {
  try {
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send('Error, user not created');
  }
};

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

//adduj item useru,  evidencija koji korisnik ima koju opremu i ifelse za dodavanje quantity na itemu u bazi

const add_user_item = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;
    const user = await User.findById(userId).exec();
    const item = await Item.findById(itemId).exec();
    //ukoliko ne postoji item na usera vratice undefined i tu imam problem
    const userItem = user.items.find(
      item => item._id.toString() === itemId.toString()
    );

    if (userItem && userItem._id.toString() === itemId.toString()) {
      userItem.quantity += 1;
      console.log('res2');
    } else {
      user.items.push(item);
      console.log('res1');
    }
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

// brisanje opreme useru

const remove_user_item = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    const updateUserItems = await User.findById(userId).exec();
    const updatedUserItems = await updateUserItems.item.filter(item => {
      return item._id.toString() !== itemId.toString();
    });
    updateUserItems.items = updatedUserItems;
    const result = await updateUserItems.save();
  } catch (error) {
    console.log({ message: error });
  }
};

module.exports = {
  create_user,
  get_users,
  update_user,
  get_specific_user,
  delete_user,
  add_user_item,
  remove_user_item,
};
