const Category=require("../models/category")

// get all categories

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('listCategories', { categories });
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

// add categories

exports.addCategory=async(req,res)=>{
    const {name}=req.body;
    try{
        const newCategory=new Category({name})
        await newCategory.save()
        res.redirect('/admin/categories')
    }
    catch(error){
        res.status(500).send("server error")
    }
}

// edit categories

exports.editCategory=async(req,res)=>{
    const {id,name}=req.body
    try{
        await Category.findByIdAndUpdate(id,{name})
        res.redirect('/admin/categories')
    }
    catch(error){
        res.status(500).send("server error")
    }
}

// delete categories

exports.toggleCategoryStatus = async (req, res) => {
    const { id } = req.body;
    try {
        const category = await Category.findById(id);
        const newStatus = !category.isActive; // Toggle the isActive status
        await Category.findByIdAndUpdate(id, { isActive: newStatus });
        res.redirect('/admin/categories');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
