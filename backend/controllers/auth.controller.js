import userModel from "../models/user.model.js";  // adjust path as needed 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


 export const login = async(req, res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }
        const token =jwt.sign(
            {id:user._id,
                email:user.email,
                role:user.role},
                process.env.JWT_SECRET,{expiresIn:"30d"})

                return res.status(200).json({
                    message:"Login successful",
                    token,
                    user:{
                        id:user._id,
                        email:user.email,
                        role:user.role
                    }
                });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" }); 
        
    }
}
