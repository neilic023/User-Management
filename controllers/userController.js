const User = require('../models/User');
const Item = require('../models/Item');
const Supply = require('../models/SupplyEquipment');

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
    const role = req.body.role;
    console.log(role);
    const update = await User.findById(id).exec();
    update.fullName = fullName;
    update.email = email;
    update.role = role;
    console.log(req.body);
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
    await User.findByIdAndDelete(id);
    res.status(200)
  } catch (error) {
    console.log({ message: error });
  }
};

//adduj item useru,  evidencija koji korisnik ima koju opremu i ifelse za dodavanje quantity na itemu u kod usera

const add_user_item = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.item;
    const user = await User.findById(userId).exec();
    const item = await Item.findById(itemId).exec();
    const userItem = user.items.find(
      item => item._id.toString() === itemId.toString()
    );
    if (userItem && userItem._id.toString() === itemId.toString()) {
      userItem.quantity += 1;
      console.log('res2');
    } else {
      user.items.push(item);
     const newItem =  user.items.find(
        item => item._id.toString() === itemId.toString()
      );
      newItem.quantity = 1;
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

//get user item
const get_user_item = async (req, res) => {
  try {
      const userId = req.params.userId;
      const itemId = req.params.itemId;
      const user = await User.findById(userId).exec();
      let items = user.items.id(itemId);
      res.status(200).json(items);
         
  } catch (error) {
    console.log(error);
  }
}


//get user items
const get_user_items = async (req, res) => {
  try {
    const id = req.params.id;
    const getUserItems = await User.findById(id).exec();
    res.status(200).json(getUserItems)
  } catch (error) {
    console.log(error)
  }
}



// brisanje sve opreme useru
const delete_user_item = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const updateUser = await User.findById(userId).exec();
    const updateUserItem = await updateUser.items.filter(item => {
      return item._id.toString() !== itemId.toString();
    });
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
    
    const equipment = new Supply({
      name: req.body.name,
      quantity: req.body.quantity,
      user: req.user.id
    });
    console.log(req.user)
     const result = await equipment.save();
     res.status(200).json(result);
  } catch (error) {
    console.log({ message: error });
  }
};

//admin view of user equipment request
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
//admin view of all user supply requests
const view_all_requests = async (req, res) => {
  try {
    const getAllRequests = await Supply.find().populate('user').exec();
    res.status(200).json(getAllRequests);
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
  get_user_item,
  get_user_items,
  delete_user_item,
  request_equipment,
  view_requests,
  view_all_requests,
};
