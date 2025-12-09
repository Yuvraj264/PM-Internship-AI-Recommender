const Internship = require('../models/Internship');
const Tag = require('../models/Category');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const Category = require('../models/Category');


// create course handler function;
exports.createInternship = async (req , res) => {
    try{
        const { internshipName, internshipDescription, internshipRole, category } = req.body;
        
        if (!internshipName || !internshipDescription || !internshipRole || !category) {
			return res.status(400).json({
				success: false,
				message: "All fields are required"
			});
		}

        const userId = req.user.id;
        const organizationDetails = await User.findById(userId);
		console.log(organizationDetails);

        if (!organizationDetails) {
			return res.status(404).json({
				success: false,
				message: "Organization details not found"
			});
		}

        const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category details not found"
			});
		}

        const newInternship = await Internship.create({
            internshipName,
            internshipDescription,
            organizationName: organizationDetails._id,
            internshipRole: internshipRole,
            category: categoryDetails._id,
        });

        await User.findByIdAndUpdate(
            { _id: organizationDetails._id },
            {
                $push: {
                    internships: newInternship._id,
                }
            },
            { new: true },
        );


        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    internship: newInternship._id,
                }
            },
            { new: true },
        )

        return res.status(200).json({
			success: true,
			message: "Internship created successfully"
		});

    }
    catch(error){
        return res.status(500).json({
			success: false,
			message: "Failed to create internship",
			error: error.message,
		});
    }
}



// get-all-courses handler fucntion;
exports.showAllInternships = async (req, res) => {
    try{
        const allInternships = await Internship.find({})
            .populate("organizationName")
            .populate("category")
            .populate("studentsEnrolled")
            .exec();

        return res.status(200).json({
			success: true,
			message: "Data for all internships fetched successfully",
			data: allInternships,
		});
    }   
    catch(error){
        console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot fetch internships data"
		});
    }
}

// enroll student in internship
exports.enrollStudent = async (req, res) => {
    try {
        const { internshipId } = req.body;
        const userId = req.user.id;

        if (!internshipId) {
            return res.status(400).json({
                success: false,
                message: "Internship ID is required"
            });
        }

        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            });
        }

        // Check if student is already enrolled (handle both ObjectId and string comparison)
        const isEnrolled = internship.studentsEnrolled.some(
            enrolledId => enrolledId.toString() === userId.toString()
        );
        
        if (isEnrolled) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled in this internship"
            });
        }

        // Add student to enrolled list
        internship.studentsEnrolled.push(userId);
        await internship.save();

        return res.status(200).json({
            success: true,
            message: "Successfully enrolled in internship",
            data: internship
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to enroll student",
            error: error.message
        });
    }
}

// get organization internships with enrolled students
exports.getOrganizationInternships = async (req, res) => {
    try {
        const userId = req.user.id;

        const internships = await Internship.find({ organizationName: userId })
            .populate("category")
            .populate("studentsEnrolled")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Organization internships fetched successfully",
            data: internships
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch organization internships",
            error: error.message
        });
    }
}