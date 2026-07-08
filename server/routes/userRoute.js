import express from "express"
import { getUserbyId, getUserResumes, loginUser, registerUser } from "../controllers/userController.js"
import protect from "../middlewares/authMiddleware.js"
const userRotuer = express.Router()


userRotuer.post('/register', registerUser)
userRotuer.post('/login', loginUser)
userRotuer.get('/data', protect, getUserbyId)
userRotuer.get('/resumes', protect, getUserResumes)

export default userRotuer