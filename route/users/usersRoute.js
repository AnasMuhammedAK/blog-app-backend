const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    userRegister,
    userLogin,
    userLogout,
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
    handleRefreshToken,
    generateVerificationTokenCtrl,
    accountVerificationCtrl
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

//USER LOGOUT
router.post('/logout',protected,userLogout)

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

//GENERATE ACCOUNT VERIFICATION TOKEN
router.get('/generate-verify-email-token',protected,generateVerificationTokenCtrl)

//VERIFY Account
router.post('/verifyaccount',protected,accountVerificationCtrl)

//FETCH USER DETAILS
router.get('/:id',protected,userDetails)


module.exports = router
