const Internship = require('../models/Internship');
const Tag = require('../models/Tags');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


// create course handler function;
exports.createInternship = async (req , res) => {
    try{
        const { internshipName, internshipDescription, internshipRole, tag } = req.body;
        
        if (!internshipName || !internshipDescription || !internshipRole || !tag) {
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

        const tagDetails = await Tag.findById(tag);
		if (!tagDetails) {
			return res.status(404).json({
				success: false,
				message: "Tag details not found"
			});
		}

        const newInternship = await Internship.create({
            internshipName,
            internshipDescription,
            organization: organizationDetails._id,
            internshipRole: internshipRole,
            tag: tagDetails._id,
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


        await Tag.findByIdAndUpdate(
            { _id: tagDetails._id },
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
exports.showAllCourses = async (req, res) => {
    try{
        const allInternships = await Internship.find({}, {
            internshipName: true,
            organization: true, 
            studentsEnrolled: true 
        }).populate("organization").exec();

        return res.status(200).json({
			success: true,
			message: "Data for all internships fetched successfully",
			data: allInternships,
		});
    }   
    catch(error){
        console.log(err);
		return res.status(500).json({
			success: false,
			message: "Cannot fetch internships data"
		});
    }
}