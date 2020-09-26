import dotenv from 'dotenv';
import { Response } from 'express';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

dotenv.config()

class Mailer {

    async handleMailSend(name: string, username: string, email: string){
        const transport = nodemailer.createTransport(mailConfig)

        const mailOptions = {            
            from: `Equipe Ecarto -<${process.env.MAIL}>`,
            to: email,
            subject: "Cadastro bem sucedido",
            text: `Cadastro bem sucedido, seja bem vindo ${name}`,
            html: `<div class="container"><h2>Seu usuário foi cadastrado com sucesso</h2> <br/>, <p>seu usuário é <b>${username}</b>, guarde-o com segurança <br>Pois é com ele que irá acessar sua conta. :) </p></div>` // html body
        };

        await transport.sendMail(mailOptions, function(err : any, response: Response) {
            if(err){
               return console.log(`ERRO!!!`, err)
            }
            console.log(`DEU BOM!!!`, response)                            
        })

    }
    
    async handleMailSendNewPassword(name: string, password: string, email: string){
        const transport = nodemailer.createTransport(mailConfig)

        const mailOptions = {            
            from: `Equipe Ecarto -<${process.env.MAIL}>`,
            to: email,
            subject: "Senha alterada com sucesso",
            text: `${name}, parece que voce perdeu sua senha`,
            html: `<div class="container"> <h2>Sua senha foi alterada com sucesso!</h2><br/> <p>use <b>${password}</b> como sua nova senha.<br/>Não se esqueça de alterar a senha assim que se conectar à plataforma :)<p> </div>` // html body
        };

        await transport.sendMail(mailOptions, function(err : any, response: Response) {
            if(err){
                return console.log(`ERRO!!!`, err)
            }
            
            console.log(`DEU BOM!!!`, response)                
        })

    }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default Mailer