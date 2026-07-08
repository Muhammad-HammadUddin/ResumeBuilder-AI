import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../model/Resume.js"

const generateToken = (userId) => {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return token;

    }
    // /api/users / register
export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required Fields" })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }


        // create new user 

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })


        const token = generateToken(newUser._id)
        newUser.password = undefined
        res.status(201).json({ message: "User create Successfully", token, user: newUser })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}



// controller for userLogin
// /api/users/login



export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or password" })
        }


        // create new user 

        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid Email or password" })
        }


        const token = generateToken(user._id)
        user.password = undefined
        res.status(200).json({ message: "User Login Successfully", token, user })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }



}



// api/user/data


export const getUserbyId = async(req, res) => {
    try {
        const userId = req.userId


        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "No user Found " })
        }
        user.password = undefined

        return res.status(200).json({ user })


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }



}


// userResumes

export const getUserResumes = async(req, res) => {
    try {
        const userId = req.userId
        const resumes = await Resume.find({ userId })
        console.log(resumes)
        return res.status(200).json({ resumes })



    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}