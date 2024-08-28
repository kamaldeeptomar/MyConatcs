const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/userModel")
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        res.status(400).json({message: "All fields are mandatory"});
    }
    const checkAvailability = await user.findOne({ email })
    if (checkAvailability){
        res.json(400).json({message: "Email all already register"});
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const createUser = await user.create({username, email, password: hashpassword})
    if (createUser){
        res.status(201).json({_id: createUser.id, email: createUser.email})
    }
    else {
        res.status(400).json({message: "Not valid data"})
    }
    res.json("register the user")
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message: "All fields are mandatory"});
    }
     const loginUser = await user.findOne({email})
     if (loginUser && (await bcrypt.compare(password, loginUser.password))){
        const accessToken = jwt.sign({
            user : {
                username : loginUser.username,
                email: loginUser.email,
                id: loginUser.id,
            }
        }, process.env.ACCESS_TOKEN_SECERT, 
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
     }
     else {
        res.status(401).json({message: "Incorrect creditials"})
     }
})

const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}