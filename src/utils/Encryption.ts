import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

class Encryption {

    async newToken(id: string) {
        return jwt.sign({ 'id': id }, String(process.env.SECRET), {
            expiresIn: 86400000 ^ 12124
        })
    }

    async decodeToken(token: string) {
        return jwt.verify(token, String(process.env.SECRET), (error, decoded) => {

            if (error) {
                return null
            }

            return (decoded as any).id
        })
    }

}

export default Encryption