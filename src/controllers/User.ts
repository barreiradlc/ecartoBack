import dotenv from "dotenv";
import { Request, Response } from 'express';
import User from '../models/User';


// import Mailer from '../utils/mailer';
// import Encryption from '../utils/Encryption';
// import Validations from '../utils/Validations';

dotenv.config()
// const cripto = new Encryption()
// const mailer = new Mailer()
// const validations = new Validations()

class UserController {

    async profile(request: Request, response: Response) {        
        const { outerUserId } = request.params
        const { userId } = response.locals
        try {
            const user = await User.findById(outerUserId || userId)
            return response.json(user)
        } catch (error) {
            return response.json({ error })
        }
    }
    
    async editProfile(request: Request, response: Response) {    
        const { userId } = response.locals
        const { file, image, name, email, instagram, about, phone } = request.body;
        

        console.log('file --')
        console.log(file)
        console.log('file --')

        try {

            const values = await {
                name, 
                email, 
                instagram, 
                image: image || file, 
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

    // async editPassword(request: Request, response: Response) {

    // }

};


export default UserController;
