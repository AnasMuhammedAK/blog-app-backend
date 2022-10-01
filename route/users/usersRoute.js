const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    profilePhotoUploadMiddleware,
    profilePhotoResize,
    bannerPhotoResize
} = require('../../middlewares/imageUploads/uploadPhoto.js')
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
    accountVerificationCtrl,
    uploadProfilePhoto,
    uploadBannerPhoto
} = require('../../controllers/users/UsersControl')

//REGISTER USER
router.post('/register', userRegister)

// LOGIN USER
router.post('/login', userLogin)

//FORGOT PASSWORD
router.post('/forgotPassword', forgotPassword)

//RESET PASSWORD
router.post('/resetpassword', resetPassword)

//VERIFY OTP
router.post('/verifyotp', verifyOtp)

//REFRESH TOKEN 
router.post('/refreshtoken', handleRefreshToken)

//USER LOGOUT
router.post('/logout', protected, userLogout)

//FETCH ALL USERS
router.get('/', protected, fetchUsers)

//USER PROFILE
router.get('/profile/:id', protected, userProfile)

//UPDATE PROFILE
router.put('/profile', protected, updateProfile)

//UPDATE PASSWORD
router.put('/password', protected, updatePassword)

//FOLLOWING
router.put('/follow', protected, userFollowing)

//UNFOLLOWING
router.put('/un-follow', protected, userUnfollowing)

//GENERATE ACCOUNT VERIFICATION TOKEN
router.post('/generate-verify-email-token', protected, generateVerificationTokenCtrl)

//VERIFY Account
router.put('/verify-account', protected, accountVerificationCtrl)

//UPLOAD PROFILE PHOTO
router.put('/profile-photo-upload',
    protected,
    profilePhotoUploadMiddleware.single("image"),
    profilePhotoResize,
    uploadProfilePhoto)
//UPLOAD PROFILE BANNER

router.put('/banner-photo-upload',
    protected,
    profilePhotoUploadMiddleware.single("image"),
    bannerPhotoResize,
    uploadBannerPhoto)

//FETCH USER DETAILS
router.get('/:id', protected, userDetails)








module.exports = router
