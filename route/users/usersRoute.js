const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    userRegister,
    userLogin,
    fetchUsers,
    deleteUser,
    userDetails,
    userProfile,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword
} = require('../../controllers/users/UsersControl')




//REGISTER USER
router.post('/register', userRegister)

// LOGIN USER
router.post('/login', userLogin)

//FETCH ALL USERS
router.get('/',protected,fetchUsers)

//DELETE USER
router.delete('/:id',deleteUser)

//FETCH USER DETAILS
router.get('/:id',userDetails)

//USER PROFILE
router.get('/profile' ,protected,userProfile)

//UPDATE PROFILE
router.put('/profile',protected,updateProfile)

//UPDATE PASSWORD
router.put('/password',protected,updatePassword)

//FORGOT PASSWORD
router.post('/forgotPassword',forgotPassword)

//RESET PASSWORD
router.post('/resetpassword',resetPassword)


module.exports = router
