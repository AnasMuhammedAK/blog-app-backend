const User = require('../../model/user/User.js')
const asyncHandler = require('express-async-handler')
const validateMongodbId = require('../../utils/validateMongodbID.js')

//----------------------------------------------------------------
// BLOCK USER
// @route PUT => /api/admin/block/:id
//----------------------------------------------------------------
const blockUser = asyncHandler(async (req, res) => {
    const loggedinUserId = req.user.id
    const { id } = req.params
    validateMongodbId(id)
    // check the loggedIn user as admin
    const admin = await User.findById(loggedinUserId)
    if(!admin.isAdmin) throw new Error('Only Admin can Block Users')
    const user = await User.findByIdAndUpdate(id, {
        isBlocked: true
    }, { new : true})
    res.status(200).json({ message: `you have successfully blocked ${ user.fullName }` ,block:true})
})
//----------------------------------------------------------------
// UNBLOCK USER
// @route PUT => /api/admin/unblock/:id
//----------------------------------------------------------------
const unBlockUser = asyncHandler(async (req, res) => {
    const loggedinUserId = req.user.id
    const { id } = req.params
    validateMongodbId(id)
    // check the loggedIn user as admin
    const admin = await User.findById(loggedinUserId)
    if(!admin.isAdmin) throw new Error('Only Admin can unblock Users')
    const user = await User.findByIdAndUpdate(id, {
        isBlocked: false
    }, { new : true})
    res.status(200).json({ message: `you have successfully unblocked ${ user.fullName }` , block:false})
})
//----------------------------------------------------------------
// DELETE USER
// @route DELETE => /api/admin/delete/:id
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



module.exports = {
    blockUser,
    unBlockUser,
    deleteUser,
}