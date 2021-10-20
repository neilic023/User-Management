const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const verify = require('./verifyToken');

//admin routes

//lista svih usera
router.get('/users', verify, userController.get_users);

//ruta get jednog usera
router.get('/users/:id', verify, userController.get_specific_user);

//kreiranje usera
router.post('/signup', authController.create_user);
//signup form
router.get('/signup', authController.signup_get);
//login page
router.get('/login', authController.login_get);
//authenticate current user
router.post('/login', authController.login_post);
//log a user out
router.get('/logout');

//update user
router.put('/users/:id', verify, userController.update_user);

//delete user
router.delete('/users/:id', verify, userController.delete_user);

//lista all databse items
router.get('/items', verify, itemController.get_items);

//get item by id
router.get('/items/:id', verify, itemController.get_single_item);

//add item to mongodb
router.post('/items', verify, itemController.add_item);

//update item
router.put('/item/:id', verify, itemController.update_item);

//delete item
router.delete('/item/:id', verify, itemController.delete_item);

//add item to user
router.post('/users/:id/items', verify, userController.add_user_item);

//delete user item
router.delete(
  '/users/:userId/items/:itemId',
  verify,
  userController.delete_user_item
);

module.exports = router;
