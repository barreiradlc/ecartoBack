import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

import mailConfig from '../config/mail'
import dotenv from 'dotenv'

dotenv.config()

class Mailer {

    async handleMailSend(name: string, username: string, email: string){
        const transport = nodemailer.createTransport(mailConfig)

        const mailOptions = {            
            from: `Equipe Ecarto -<${process.env.MAIL}>`,
            to: email,
            subject: "Cadastro bem sucedido",
            text: `Cadastro bem sucedido, seja bem vindo ${name}`,
            html: `<h2>Seu usuário foi cadastrado com sucesso, seu usuário é <b>${username}</b>, guarde-o com segurança <br>Pois é com ele que irá acessar sua conta. :) </h2>` // html body
        };

        await transport.sendMail(mailOptions, function(err : any, response: Response) {
            if(err){
                console.log(`ERRO!!!`, err)
            }else {
                console.log(`DEU BOM!!!`, response)                
            }

        })

    }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export default Mailer

