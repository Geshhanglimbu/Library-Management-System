import userModel from "../models/user.model.js";  // adjust path as needed
import bcrypt from 'bcrypt';    
import jwt from 'jsonwebtoken';

export const register= async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        
        if(!name || !email || !password || !role){
            return res.status(400).json({ message: "All fields are required" });
        }
        const existinguser=await userModel.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"user already exists"});

        }
        const hashedPassword =await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
        res.status(201).json({
            message: "Registration successful",
            token,
            user:{
                id: newUser._id,
                name:newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    }catch (error) {
    console.error("Registration error:", error.message);
    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" }); 
}

}