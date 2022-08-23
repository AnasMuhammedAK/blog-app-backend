const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    userRegister,
    userLogin,
    fetchUsers,
    userDetails,
    userProfile,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    verifyOtp,
    userFollowing,
    userUnfollowing,
    handleRefreshToken
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

//REFRESH TOKEN 
router.post('/refreshtoken',handleRefreshToken)

//FETCH ALL USERS
router.get('/',protected,fetchUsers)

//USER PROFILE
router.get('/profile' ,protected,userProfile)

//UPDATE PROFILE
router.put('/profile',protected,updateProfile)

//UPDATE PASSWORD
router.put('/password',protected,updatePassword)

//FOLLOWING
router.put('/follow',protected,userFollowing)

//UNFOLLOWING
router.put('/unfollow',protected,userUnfollowing)

//FETCH USER DETAILS
router.get('/:id',protected,userDetails)






module.exports = router
