const express = require("express");
const router = express.Router();

// importing internship controller
const { createInternship, showAllInternships, enrollStudent, getOrganizationInternships }= require("../controllers/Internship");

// importing category controller
const { createCategory, showAllCategory, category} = require("../controllers/Category");

// importing middlewares
const { auth, isAdmin, isOrganization, isStudent } = require("../middlewares/auth");

// internship routes
router.post("/createInternship", auth, isOrganization, createInternship);
router.get("/showAllInternships", auth, showAllInternships);
router.post("/enrollStudent", auth, isStudent, enrollStudent);
router.get("/getOrganizationInternships", auth, isOrganization, getOrganizationInternships);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);

module.exports = router;