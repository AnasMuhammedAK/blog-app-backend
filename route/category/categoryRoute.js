const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    createCategory,
    fetchAllCategory,
    fetchCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/category/categoryControl')


//CRETE CATEGORY
router.post('/create', protected, createCategory)

//FETCH ALL CATEGORIES
router.get("/all", fetchAllCategory)

//FETCH SINGLE CATEGORY
router.get('/:id', fetchCategory)

//UPDATE CATEGORY
router.put('/:id', protected, updateCategory)

//DELETE CATEGORY
router.delete('/:id', protected, deleteCategory)



module.exports = router