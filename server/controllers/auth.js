import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

// REGISTER USER :
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation,
        } = req.body;

        const namak = await bcrypt.genSalt();
        const passfilter = await bcrypt.hash(password, namak);

        const newuser = new user({
            firstName,
            lastName,
            email,
            password : passfilter,
            picturepath,
            friends,
            location,
            occupation,
            veiwedprofile : Math.floor(Math.random() * 1000),
            impressions : Math.floor(Math.random() * 1000),
        });
        const savedUser = await newuser.save();
        res.status(201).json(savedUser);
    } catch (wrong) {
        res.status(500).json({ error: wrong.message });
    }
}

// LOGGING IN :
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email: email });
        if (!user) return res.status(400).json({msg: "User does not exist in our database."});

        const isMatch = await bcrypt.compare( password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid Credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200),json({token, user});
    } catch (wrong) {
        res.status(500).json({ error: wrong.message });
    }
}