const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

router.get('/',authenticate,userController.index );
router.get('/view/:id',authenticate,userController.userById);
router.post('/login',userController.login);
router.post('/register',userController.register);
router.put('/update/:id',authenticate,userController.updateUser);
router.delete('/delete/:id',authenticate,userController.deleteUser);

module.exports = router;