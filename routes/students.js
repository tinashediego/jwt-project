const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const authenticate = require('../middleware/auth')

router.get('/',authenticate,studentController.index )
router.get('/show/:studentID',authenticate,studentController.show)
router.post('/insert',authenticate,studentController.insert)
router.put('/update/:id',authenticate,studentController.update)
router.delete('/destroy/:id',authenticate,studentController.destroy)

module.exports = router