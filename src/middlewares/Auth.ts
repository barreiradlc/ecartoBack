import { Request, Response, NextFunction } from 'express';
import Encryption from "../utils/Encryption";

const crypt = new Encryption()

export const validToken = async (request: Request, response: Response, next: NextFunction) => {

    const { authorization } = request.headers

    if(!authorization){
        return response.status(401).send({ error: "No token provided" })
    }

    const parts = authorization.split(' ')    

    if(parts.length !== 2){
        return response.status(401).send({error: "Token error"})
    }

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme)){
        return response.status(401).send({error: "Token malformated"})
    }

    response.locals.userId = await crypt.decodeToken(token)
    // response.locals.user = await User.findById(id)

    next()
}