const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    blockUser,
    unBlockUser,
    deleteUser,
} = require('../../controllers/admin/adminControl')

//BLOCK USERS
router.put('/block/:id',protected, blockUser)

//BLOCK USERS
router.put('/unblock/:id',protected, unBlockUser)

//DELETE USER
router.delete('/delete/:id', protected, deleteUser)

module.exports = router