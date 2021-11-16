const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const verify = require('../middleware/authMiddleware');

//admin routes

//lista svih usera
router.get(
  '/users',
  verify,
  authController.restrict_to('admin'),
  userController.get_users
);

//ruta get jednog usera
router.get(
  '/user/:id',
  verify,
  authController.restrict_to('admin'),
  userController.get_specific_user
);

//update user
router.put(
  '/user/:id',
  authController.restrict_to('admin'),
  verify,
  userController.update_user
);

//delete user
router.delete(
  '/user/:id',
  verify,
  authController.restrict_to('admin'),
  userController.delete_user
);

//lista all databse items
router.get(
  '/equipment',
  verify,
  authController.restrict_to('admin'),
  itemController.get_items
);

//get item by id
router.get(
  '/equipment/:id',
  verify,
  authController.restrict_to('admin'),
  itemController.get_single_item
);

//add item to mongodb
router.post(
  '/add',
  verify,
  authController.restrict_to('admin'),
  itemController.add_item
);

//update item
router.put(
  '/equipment/:id',
  verify,
  authController.restrict_to('admin'),
  itemController.update_item
);

//delete item
router.delete(
  '/equipment/:id',
  verify,
  authController.restrict_to('admin'),
  itemController.delete_item
);

//add item to user
router.post(
  '/user/:id/equipment',
  verify,
  authController.restrict_to('admin'),
  userController.add_user_item
);

//get user items
  router.get('/user/:id/equipment', userController.get_user_items)

//get user item ova ruta vrv nece trebati
  router.get('/user/:userId/equipment/:itemId', userController.get_user_item)

//delete user item
router.delete(
  '/user/:userId/equipment/:itemId',
  verify,
  authController.restrict_to('admin'),
  userController.delete_user_item
);

//kreiranje usera login, logout, kreiranje usera
router.post('/signup', authController.create_user);

//authenticate current user
router.post('/login', authController.login_post);

//log a user out
router.get('/logout', authController.logout_get);

//endpointi za usere i slanje zahteva za opremu
  router.post('/api/req', userController.request_equipment);

//admin get endpoint za user request po idu
router.get(
  '/api/req/:id',
  verify,
  authController.restrict_to('admin'),
  userController.view_requests
);

//admin get endpoint za sve user requestove
router.get(
  '/api/req',
  verify,
  authController.restrict_to('admin'),
  userController.view_all_requests
);

module.exports = router;
