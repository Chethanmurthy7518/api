const express = require('express')
const router = express.Router()
const Authorization = require('../middlewares/auth')
const pController = require('../controllers/products')


router.get('/products',Authorization.authorizeUserAdmin,pController.getProducts)
router.post('/add-product',Authorization.authorizeAdmin,pController.addproduct)
router.put('/edit-product',Authorization.authorizeAdmin,pController.editproduct)
router.delete('/delete-product',Authorization.authorizeAdmin,pController.deleteproduct)

module.exports = router