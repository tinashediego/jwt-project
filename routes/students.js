const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticate = require('../middleware/auth');

router.get('/',authenticate,studentController.index);
router.get('/show/:id',authenticate,studentController.show);
router.post('/insert',authenticate,studentController.insert);
router.put('/update/:id',authenticate,studentController.update);
router.delete('/delete/:id',authenticate,studentController.deleteStudent);

module.exports = router;