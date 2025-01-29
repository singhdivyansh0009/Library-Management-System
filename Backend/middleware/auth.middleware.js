import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req,res,next) => {
         try{
            // get the access token from the cookies
            const token = req.cookies?.accessToken;
            // console.log(token);
            // check if token is present or not
            if(!token)
               return res.status(403).json({sucess:false, message:"unauthorized request"})

            // verify the token
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            
            // get the user from database 
            const user = await User.findOne({userId: decoded.userId}).select("-password -refreshToken");
            
            if(!user)
                return res.status(401).json({message:"Invalid acess token"});
            // if user present add that to the request object
            req.user = user
            next()  // move to the next method
            
         }catch(err){
            console.log("Error while verifying JWT :",err);
            res.status(500).json({ message: "Internal Server Error" });
         }
}

// Middleware to check if user has the right role
const isAdmin = () => {
   return (req, res, next) => {
      console.log(req.user);
     if (!req.user?.isAdmin) {
       return res.status(403).json({ message: 'Access Forbidden' });
     }
     next();
   };
 }

 export {verifyJWT,isAdmin};