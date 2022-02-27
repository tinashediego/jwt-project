const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticate = require('../middleware/auth')

router.get('/',authenticate,userController.index )
//router.get('/show/:studentID',authenticate,studentController.show)
router.post('/login',userController.login)
router.post('/register',userController.register)
//router.put('/update/:id',authenticate,studentController.update)
//router.delete('/destroy/:id',authenticate,studentController.destroy)

module.exports = router