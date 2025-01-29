import { User } from "../models/user.model.js";

// function to genrate access and refresh token
const genrateTokens = async (user) => {
  try {
    // genrate tokens 
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log(accessToken);

    // save the refreshToken
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

    return { accessToken, refreshToken }
  } catch (error) {
     console.log("Error while genrating token :",error);
  }     
}

// login 
export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ userId });
    if (!user)
      return res.status(404).json({  success: false, message: "Incorrect userId" });

    if (user.password !== password)
      return res.status(404).json({ success:false, message: "Incorrect Password" });

    const { accessToken, refreshToken } = await genrateTokens(user);

    const loggedInUser = user.toObject();
    delete loggedInUser.password;
    delete loggedInUser.refreshToken;

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'none',
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json({ status: true, data: loggedInUser, message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in", details: error.message });
  }
};


// logout
export const logout = async (req,res) => {
  try{
    // get the user from database using user set on req by verifyJWT middleware
    await User.findOneAndUpdate({userId: req.user.userId},{
      $unset : {
        refreshToken : 1
     }
  })
  // clear the cookies and return the response to the user
  const options = {
     httpOnly : true,
     secure : true
  }
  return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json({
          success:true,
          message:"logout sucessfully"
        })
    }catch(err){
      return res.status(500).json({success:false, error: err.detail});
   }
}
