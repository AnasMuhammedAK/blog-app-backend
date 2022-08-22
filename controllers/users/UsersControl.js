
const User = require('../../model/user/User.js')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateToken = require('../../config/token /generateToken.js')
const validateMongodbId = require('../../utils/validateMongodbID.js')
const jwt = require('jsonwebtoken')
const sendMail = require('../../utils/sendMail.js')
const { sendOtp, verifyOTP } = require('../../utils/twilio.js')
const { response } = require('express')

//----------------------------------------------------------------
// USER REGISTER
// @route POST => /api/users/register
//----------------------------------------------------------------
const userRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password, phone } = req.body
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error('User already exists')
    }
    //check if phone number is already registered
    const phoneExists = await User.findOne({ phone })
    if (phoneExists) {
        res.status(409)
        throw new Error('This phone number is already taken by another user')
    }

    //send OTP
    //await sendOtp(phone)

    //Create new user
    try {

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword
        })
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// VERIFY OTP
// @route POST => /api/users/verifyotp
//----------------------------------------------------------------
const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, id, phone } = req.body
    require("dotenv").config();
    //otp twilio integration-----------------------------------------
    const Messaging_Service_SID = process.env.Messaging_Service_SID;
    const Account_SID = process.env.Account_SID;
    const Auth_Token = process.env.Auth_Token;
    const OTP = require("twilio")(Account_SID, Auth_Token);
    //     OTP.verify
    //         .services(Messaging_Service_SID)
    //         .verificationChecks.create({
    //             to: `+91${phone}`,
    //             code: otp,
    //         })
    //         .then(async(response) => {
    //             console.log(response)
    //             if (response.valid) {
    //                 const user = await User.findByIdAndUpdate(id, {
    //                     isMobileVerified: true
    //                 }, {
    //                     new: true,
    //                     runValidators: true
    //                 })
    //                 res.status(200).json({ message: 'Your Mobile number is verified' ,status:true})
    //             } else {
    //                 console.log("not valid");
    //                 res.json({message:"Mobile Number not verified,try again later" ,status:false})
    //             }
    //         }).catch((error)=>{
    // console.log(error,'error')
    //         })
    if (otp == 123456) {
        res.status(200).json({ message: 'Your Mobile number is verified', status: true })
    } else {
        res.json({ message: "Mobile Number not verified,try again later", status: false })
    }
})
//----------------------------------------------------------------
// USER LOGIN
// @route POST => /api/users/login
//----------------------------------------------------------------
const userLogin = asyncHandler(async (req, res) => {
    const { email, password, phone } = req.body
    //Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error('Login credentials not found')
    }
    // Check if password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
//----------------------------------------------------------------
// FETCH ALL USERS
// @route GET => /api/users
//----------------------------------------------------------------
const fetchUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length > 0) {
            res.status(200)
            res.json(users)
        } else {
            res.status(401)
            throw new Error('User not found')
        }
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// DELETE USER
// @route DELETE => /api/users/:id
//----------------------------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)   //Check if user id is valid
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            res.status(401)
            throw new Error(`User ID - ${id} not found`)
        }
        res.status(200).json(deletedUser)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// USER DETAILS
// @route GET => /api/users/:id
//----------------------------------------------------------------
const userDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)   //Check if user id is valid
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(401)
            throw new Error(`User ID - ${id} not found`)
        }
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// USER PROFILE
// @route GET => /api/users/profile
//----------------------------------------------------------------
const userProfile = asyncHandler(async (req, res) => {
    const { id } = req.user
    validateMongodbId(id)  //Check if user id is valid
    try {
        const myProfile = await User.findById(id)
        res.status(200).json(myProfile)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// UPDATE USER PROFILE
// @route PUT => /api/users/profile
//----------------------------------------------------------------
const updateProfile = asyncHandler(async (req, res) => {
    const { id } = req.user  // user from auth middleware
    validateMongodbId(id) //Check if user id is valid 
    try {
        const user = await User.findByIdAndUpdate(id, {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            bio: req.body.bio
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// UPDATE USER PASSWORD
// @route PUT => /api/users/paswword
//----------------------------------------------------------------
const updatePassword = asyncHandler(async (req, res) => {
    const { id } = req.user  // user from auth middleware
    const { password } = req.body
    validateMongodbId(id) //Check if user id is valid 
    try {
        const user = await User.findById(id)
        if (password) {
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            user.password = hashedPassword
            const updatedUser = await user.save()
            res.status(200).json(updatedUser)
        } else {
            res.status(304).json(user)
        }
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// FORGOT PASSWORD
// @route POST => /api/users/forgotPaswword
//----------------------------------------------------------------
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    //make sure use exists
    const user = await User.findOne({ email })
    if (!user) throw new Error(`User with email : ${email} not found`)

    //if user exists create aone time link valid for 10 minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10m',
    })
    //create link
    const link = `http://localhost:3000/resetPassword/${token}`
    sendMail(link, email)
    res.status(200).json({ message: 'Password reset link sended successfully to your email address' })
})
//----------------------------------------------------------------
// RESET PASSWORD
// @route POST => /api/users/resetPaswword
//----------------------------------------------------------------
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    try {
        // verify the token is valid

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(req.body)
        const user = await User.findById(decoded.id).select('-password')

        if (password) {
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            console.log(hashedPassword)
            user.password = hashedPassword
            const updatedUser = await user.save()
            res.status(200).json({ message: "Your password updated" })
        } else {
            res.status(304).json(user)
        }

    } catch (error) {
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq')
        console.log(error.message)
        throw new Error("your reset password link expired")
    }

})
//----------------------------------------------------------------
// FOLLOWING
// @route POST => /api/users/follow
//----------------------------------------------------------------
const userFollowing = asyncHandler(async (req, res) => {
    const { followId } = req.body
    const loggedinUserId = req.user.id
    // 1.find the user you wanted to be follow and update it's followers feild
    // first we check if the user is already following
    const targetUser = await User.findById(followId) 
    const isFollowing = targetUser.followers.find(
        singleId => singleId.toString() === loggedinUserId.toString())
    if (isFollowing) throw new Error(`alredy following`)

    await User.findByIdAndUpdate(followId, {
        $push: { followers: loggedinUserId }
    })
    // 2. update the user's following field 
    const user = await User.findByIdAndUpdate(loggedinUserId, {
        $push: { following: followId }
    })

    res.json(isFollowing)
})


module.exports = {
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
}
