const Category = require('../models/Category');


// create-tag handler function;
exports.createCategory = async (req , res) => {
    try{
        const { name, description } = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const categoryDetails = await Category.create({name: name, description: description});

        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



// get-all-category handler function;
exports.showAllCategory = async (req, res) => {
    try{
        const allCategory = await Category.find({}, {name: true, description: true});

        return res.status(200).json({
            success: true,
            message: "All categorys returned successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}