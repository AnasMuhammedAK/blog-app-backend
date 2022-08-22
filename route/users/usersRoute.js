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
    resetPassword,
    verifyOtp,
    userFollowing
} = require('../../controllers/users/UsersControl')




//REGISTER USER
router.post('/register', userRegister)

// LOGIN USER
router.post('/login', userLogin)

//FORGOT PASSWORD
router.post('/forgotPassword',forgotPassword)

//RESET PASSWORD
router.post('/resetpassword',resetPassword)

//VERIFY OTP
router.post('/verifyotp',verifyOtp)

//FETCH ALL USERS
router.get('/',protected,fetchUsers)

//FETCH USER DETAILS
router.get('/:id',protected,userDetails)

//DELETE USER
router.delete('/:id',protected,deleteUser)

//USER PROFILE
router.get('/profile' ,protected,userProfile)

//UPDATE PROFILE
router.put('/profile',protected,updateProfile)

//UPDATE PASSWORD
router.put('/password',protected,updatePassword)

//FOLLOWING
router.put('/follow',protected,userFollowing)




module.exports = router
