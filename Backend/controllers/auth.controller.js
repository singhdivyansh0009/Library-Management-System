import { User } from "../models/user.model";

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if(!email || !password || !role)
    {
        return res.status(404).json({
            success: false,
            message: "All fields are required",
        })
    }
    const user = await User.find({
      $and: [{ email: email }, { password: password }],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res
      .status(200)
      .json({ status: true,data:user, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
}