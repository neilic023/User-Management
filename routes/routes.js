const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');

//admin routes

//lista svih usera
router.get('/users', userController.get_users);

//ruta get jednog usera
router.get('/users/:id', userController.get_specific_user);

//kreiranje usera
router.post('/users', userController.create_user);

//update usera
router.put('/users/:id', userController.update_user);

//brisanje usera
router.delete('/users/:id', userController.delete_user);

//lista svih itema iz baze
router.get('/items', itemController.get_items);

//get itema po id-u
router.get('/items/:id', itemController.get_single_item);

//dodavanje itema u bazu
router.post('/items', itemController.add_item);

//update itema u bazi
router.put('/item/:id', itemController.update_item);

//brisanje itema iz baze
router.delete('/item/:id', itemController.delete_item);

//dodavanje opreme useru
router.post('/users/:id/items', userController.add_user_item);

//brisanje itema useru
router.delete('/users/:userId/items/:itemId', userController.remove_user_item);

module.exports = router;
