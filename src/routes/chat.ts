import { Router } from 'express'

import Chat from "../controllers/Chat";
import { validToken } from '../middlewares/Auth'

const chatController = new Chat()
const router = Router()

// TODO - DOC
// TODO - MODELS
// TODO - SERVICES
// TODO - TESTS

// router.get('/doc', (request: Request, response: Response) => {
//     fs.readFile('./src/docs/apiDocUser.json', (err: any, data: any) => {
//         if(err){
//             return response.status(400).json({
//                 erro: err
//             })
//         }
//         response.json(JSON.parse(data))
//     })
// })

router.use(validToken)

router.get('/:id', chatController.createOrFindChatRoom);
router.post('/:id', chatController.sendMessage);
router.get('/', chatController.findChats);

export default router