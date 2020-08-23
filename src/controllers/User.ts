import dotenv from "dotenv";
import { Request, Response } from 'express';
import bcrypt from "bcryptjs";


import User from '../models/User';
// import Mailer from '../utils/mailer';
import Encryption from '../utils/Encryption';
import Validations from '../utils/Validations';

dotenv.config()
const cripto = new Encryption()
// const mailer = new Mailer()
const validations = new Validations()

class UserController {

    async profile(request: Request, response: Response) {        
        const { userId } = response.locals
        try {
            const user = await User.findById(userId)
            return response.json(user)
        } catch (error) {
            return response.json({ error })
        }
    }
    
    async editProfile(request: Request, response: Response) {    
        const { userId } = response.locals
        const { file, name, email, instagram, about, phone } = request.body;
        

        console.log('file --')
        console.log(file)
        console.log('file --')

        try {

            const values = {
                name, 
                email, 
                instagram, 
                image: file, 
                about, 
                phone
            }
            
            await User.findByIdAndUpdate(userId, values)

            return response.json({
                values                
            })

        } catch (error) {
            return response.status(401).json({ error })
        }
    }

    async editPassword(request: Request, response: Response) {

    }

};


export default UserController;
