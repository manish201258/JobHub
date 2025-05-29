import express from "express";
import { login,logout,register,updateProfile,profile } from "../controllers/usercontrollers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();

router.route("/signup").post(singleUpload,register);
router.route("/login").post(login);
router.route('/logout').get(logout);
router.route("/profile").get(isAuthenticated,profile);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;