import dotenv from 'dotenv'

dotenv.config()

// export default {
//     service: "gmail",
//     auth: {
//         user: process.env.MAIL,
//         pass: process.env.PASS
//     }    
// }

export default {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, //ssl
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }    
}