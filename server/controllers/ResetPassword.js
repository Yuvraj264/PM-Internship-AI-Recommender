const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')


// reset password token;
exports.resetPasswordToken = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us"
            });
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        return res.status(200).json({
            success: true,
            message: "Email is sent successfully"
        });
    }
    catch(err){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating token for resetting password"
        });
    }
}



// reset password;
exports.resetPassword = async (req, res) => {
    try{
        const { password, confirmPassword, token } = req.body;

        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password not match"
            });
        }

        const userDetails = await User.findOne({token: token});

        if(!userDetails){
            return res.status(403).json({
                success: false,
                message: "Token invalid"
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token time out"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        )
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password"
        });
    }
}