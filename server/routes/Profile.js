const express = require("express");
const router = express.Router();

// importing profile controllers
const { deleteAccount, updateProfile, getAllUserDeatils, getUserDetailsById } = require("../controllers/Profile");

// importing middlewares
const { auth, isStudent, isOrganization } = require("../middlewares/auth");

// profile routes
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDeatils);
router.get("/getUserDetails/:userId", auth, isOrganization, getUserDetailsById);

module.exports = router;