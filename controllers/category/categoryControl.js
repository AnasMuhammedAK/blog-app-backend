const asyncHandler = require("express-async-handler")
const Category = require("../../model/category/category.js")


//----------------------------------------------------------
//CREATE CATEGORY
//@route POST => /api/category/create
//----------------------------------------------------------
const createCategory = asyncHandler( async(req, res) => {
    const { title } = req.body
    const { id, isAdmin } = req.user
    if (!isAdmin) throw new Error("Only admins can create categories.")
    const isExist = await Category.findOne({ title })
    if (isExist) throw new Error("Category Already Exists")
  try {
    const category = await Category.create({
        title,
        user: id
    })
    res.status(200).json(category)
  } catch (error) {
    throw new Error(error.message)
  }
})
//----------------------------------------------------------
//FETCH ALL CATEGORIES
//@router GET /api/category
//----------------------------------------------------------
const fetchAllCategory = asyncHandler( async (req, res) => {
     try {
        const categories = await Category.find({}).populate("user").sort({createdAt: -1})
        res.status(200).json(categories)
     } catch (error) {
        throw new Error(error.message)
     }
})
//----------------------------------------------------------
//FETCH SINGLE CATEGORY
//@router GET /api/category/:id
//----------------------------------------------------------
const fetchCategory = asyncHandler( async (req, res) => {
    const { id } = req.params
    try {
       const category = await Category.findById(id).populate('user')
       res.status(200).json(category)
    } catch (error) {
       throw new Error(error.message)
    }
})
//----------------------------------------------------------
//UPDATE CATEGORY
//@router PUT /api/category/:id
//----------------------------------------------------------
const updateCategory = asyncHandler( async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findByIdAndUpdate(id,{
            title: req.body.title
        },{
            new: true,
            runValidators: true
        })
        res.status(200).json(category)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------
//DELETE CATEGORY
//@router DELETE /api/category/:id
//----------------------------------------------------------
const deleteCategory = asyncHandler (async (req,res) => {
    const { id } = req.params
    try {
       const category = await Category.findByIdAndDelete(id)
        res.status(200).json(category)
    } catch (error) {
        throw new Error(error.message)
    }
})


module.exports = {
    createCategory,
    fetchAllCategory,
    fetchCategory,
    updateCategory,
    deleteCategory
}
