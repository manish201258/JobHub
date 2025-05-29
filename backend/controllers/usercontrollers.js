import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Profile photo is required",
                success: false
            });
        }
        const fileUri = getDataUri(file);
        console.log("File URI:", fileUri.content); // Debugging output
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Return token in both cookie and response
        return res.status(200)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                token, // For clients that prefer to store it themselves
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile
                }
            });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            success: false 
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);
        const file = req.file;
        // cloudinary ayega idhar
        let cloudResponse;
       
        if (file) {
            const fileUri = getDataUri(file);
            
            // Upload with explicit PDF settings
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: 'raw', // CRITICAL for PDFs
                format: 'pdf',
                type: 'upload',
                public_id: `resumes/${user._id}_${Date.now()}`,
                tags: 'resume',
                invalidate: true
            });

            // Store the URL with forced download parameter
        user.profile.resume = `${cloudResponse.secure_url}?dl=1`;
        user.profile.resumePublicId = cloudResponse.public_id;
        user.profile.resumeOriginalName = file.originalname;
    }

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
      

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
       

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const profile = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: No user ID found" 
            });
        }

        const user = await User.findById(req.user.userId)
            .select('-password -__v') // Exclude sensitive fields
            .populate('profile.company', 'name logo'); // If using company reference

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        // Transform profile photo URL if needed
        if (user.profile?.profilePhoto) {
            user.profile.profilePhoto = ensureHttps(user.profile.profilePhoto);
        }

        return res.status(200).json({ 
            success: true,
            user 
        });

    } catch (error) {
        console.error("Profile Error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
};

// Helper function to ensure HTTPS URLs
function ensureHttps(url) {
    if (!url) return url;
    return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
}