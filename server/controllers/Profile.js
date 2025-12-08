const Profile = require('../models/Profile');
const User = require('../models/User');


// update-profile handler function
const updateProfile = async (req , res) => {
    try{
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        const userId = req.user.id;

        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update profile",
            error: error.message,
        });
    }
}



// delete-account handler function
exports.deleteAccount = async (req, res) => {
    try{
        const userId = req.user.id;

        if(!userId){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        await Profile.findByIdAndDelete({_id: profileId});
        await User.findByIdAndDelete({_id: userId});

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete account",
            error: error.message,
        });
    }
}




// get-all-user-details handler function
exports.getAllUserDeatils = async (req, res) => {
    try{
        const id = req.user.id;

        if(!id){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user data",
            error: error.message,
        });
    }
}