const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//CREATE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        fullName: {
            required: [true, "First name is required"],
            type: String,
        },
        profilePhoto: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        bannerPhoto: {
            type: String,
            default:
                "https://live.staticflickr.com/65535/51350239267_54560763e6_b.jpg",
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        phone: {
            type: Number
        },
        bio: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Hei buddy Password is required"],
        },
        refreshTokens: {
            type: Array,
            default: [],
        },
        postCount: {
            type: Number,
            default: 0,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        roles: {
            type: [],
            //enum: ["Admin", "Guest", "Blogger"],
            default: ["Blogger"]
        },
        isFollowing: {
            type: Boolean,
            default: false,
        },
        isUnFollowing: {
            type: Boolean,
            default: false,
        },
        isAccountVerified: { type: Boolean, default: false },
        isMobileVerified: { type: Boolean, default: false },
        accountVerificationToken: String,
        accountVerificationTokenExpires: Date,

        viewedBy: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
        },

        followers: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
        },
        following: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
        },
        passwordChangeAt: Date,
        passwordRessetToken: String,
        passwordResetExpires: Date,

        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);
//virtual methode to populate the created posts
userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id"
})
// Account Type
userSchema.virtual("accountType").get(function () {
    const totalFollowers = this.followers?.length
    return totalFollowers >= 2 ? true : false
})
//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
