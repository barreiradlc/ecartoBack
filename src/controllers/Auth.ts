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

class Auth {

    async login(request: Request, response: Response) {

        const { email, password } = request.body

        const validEmail = validations.mailValidate(email)

        const user = await User.findOne({ [validEmail ? 'email' : 'username']: email }).select('+password')

        if (!user) {
            return response.status(400).send({ error: "Usuário não encontrado" })
        }

        if (!await bcrypt.compare(password, (user as any).password)) {
            return response.status(400).send({ error: "Usuário e senha não correspondem" })
        }
                
        return response.send({
            email: (user as any).email,
            username: (user as any).username,
            token: await cripto.newToken((user as any)._id)
        })

    }

    async register(request: Request, response: Response) {
        const { body } = request

        try {

            const queryUser = await User.find({
                $or:[
                    {email: body.email},
                    {username: body.username}
                ]
            })

            const registeredUser = queryUser[0]

            if(registeredUser){
                let errors = []

                if((registeredUser as any).email === body.email){
                    errors.push({ message: "Email já cadastrado"})
                }
                
                if((registeredUser as any).username === body.username){
                    errors.push({ message: "Usuário já cadastrado"})
                }
                
                return response.send(errors)

            }
            
            let user = await User.create(body)

            const { email, username } = (user as any)

            return response.send({
                email,
                username,
                token: await cripto.newToken((user as any)._id)
            })

        } catch (error) {
            return response.status(400).json({ error })
        }
    }

};


export default Auth;
