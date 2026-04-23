import User from "../models/users.model.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({login:false, msg: "Username and password are required"});
        }
        
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(401).json({login:false, msg: "Invalid credentials", user:{}});
        }
        
        if (user.password === password) {
            res.json({login:true, msg: "Login successful", user:user});
        } else {
            res.status(401).json({login:false, msg: "Invalid credentials", user:{}});
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({login:false, msg: "Internal server error"});
    }
}