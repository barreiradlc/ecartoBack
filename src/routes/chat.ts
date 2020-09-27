import { Router } from 'express'

import Chat from "../controllers/Chat";
import { validToken } from '../middlewares/Auth'

const chatController = new Chat()
const router = Router()

// TODO - DOC
// TODO - SERVICES
// TODO - TESTS

router.use(validToken)

router.get('/:id', chatController.createOrFindChatRoom);
router.post('/:id', chatController.sendMessage);
router.get('/', chatController.findChats);

export default router