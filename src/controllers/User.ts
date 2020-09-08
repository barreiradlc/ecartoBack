import dotenv from "dotenv";
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs"
import crypto from 'crypto'

import Mailer from '../utils/mailer';
// import Encryption from '../utils/Encryption';
// import Validations from '../utils/Validations';

dotenv.config()
// const cripto = new Encryption()
const mailer = new Mailer()
// const validations = new Validations()

class UserController {

    async profile(request: Request, response: Response) {        
        const { outerUserId } = request.query
        const { userId } = response.locals

        console.log({request})
        console.log({outerUserId})
        console.log({userId})

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

    async newPassword(request: Request, response: Response) {
        const { email } = request.body;  

        try {             
            const user = await User.findOne({ email })

            if(!user){
                return response.status(401).json({ error: "Email não cadastrado" })
            }

            const newPassword = crypto.randomBytes(5).toString("HEX")

            await user.updateOne({
                recoverPassword: await bcrypt.hash(newPassword, 12)
            })
            

            // SEND MAILER
            await mailer.handleMailSendNewPassword((user as any).name, newPassword, email)

            // TODO RESPONSE
            return response.send({ "message": "Nova senha gerada com sucesso!" })
                        
        } catch (error) {
            return response.status(401).json({ error })
        }
        
    }

    async editPassword(request: Request, response: Response) {
        const { userId } = response.locals
        const { password } = request.body;        
        try {
            await User.findByIdAndUpdate(userId, {
                password: await bcrypt.hash(password, 12),    
                recoverPassword: undefined            
            })
            return response.send({ "message": "Senha alterada com sucesso!" })
        } catch (error) {
            return response.status(401).json({ error })
        }
    }

};


export default UserController;
