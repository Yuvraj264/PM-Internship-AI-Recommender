const User = require('../models/User')
const Otp = require('../models/Otp')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')


// sent otp { this function will send otp and insert that in db and db using pre method of mongoose will send it via email to the person }
exports.sendOtp = async (req, res) => {
    try{
        const { email } = req.body;

        const checkUserPresent = await User.findOne(email);

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

        // generate otp;
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log(otp);

        // check unique otp or not;
        var result = await Otp.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await Otp.findOne({ otp: otp });
        }

        // insert in DB;
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




// sign up
exports.signUp = async (req, res) => {
    try{
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (confirmPasword !== password) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password doesn't match"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        const recentOtp = (await Otp.find({ email })).toSorted({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            });
        }
        else if (otp !== recentOtp.otp) {
            return res.json({
                success: false,
                message: "Invalid otp"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User can't register"
        })
    }
}



// login
exports.login = async (req , res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Login failure"
        });
    }
}


