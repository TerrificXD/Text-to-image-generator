import express from 'express';
import { registerUser, loginUser, userCredit, addCredits } from '../controller/userController.js';
import userAuth from '../Middlewares/auth.js';

const userRouter = express.Router(); 

// localhost:5000/api/user/register
userRouter.post('/register', registerUser); // Define the route for user registration
// localhost:5000/api/user/login
userRouter.post('/login', loginUser); // Define the route for user login
// localhost:5000/api/user/credit
userRouter.post('/credit', userAuth, userCredit); // Define the route for user credit balance
// localhost:5000/api/user/add-credits
userRouter.post('/add-credits', userAuth, addCredits); // Define the route for adding credits


export default userRouter; 

