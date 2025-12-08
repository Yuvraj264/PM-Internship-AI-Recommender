const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
});

const sendVerificationMail = async (email, otp) => {
    try{
        const mailResponse = await mailSender(email, "Verification Email from Intership Recommender", otp);
        
        console.log("Email send successfully: ", mailResponse);

    }
    catch(err){

    }
}


otpSchema.pre("save", async (next) => {
    await sendVerificationMail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("Otp", otpSchema);