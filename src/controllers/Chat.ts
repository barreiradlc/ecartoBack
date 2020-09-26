import { Request, Response } from 'express';

import Chat, { IMessage } from '../models/Chat'
import Message from '../models/Message';

class ChatController {
    async createOrFindChatRoom(request: Request, response: Response){
        const { id } = request.params;
        const { userId } = response.locals        

        try {
            
            const chat = await Chat
                .find({
                    users: {
                        $in: [userId, id]
                    },
                })

            console.log("-----")
            console.log(id)
            console.log(chat)

            if(chat.length === 0){
                return response.json(await Chat.create({users: [userId, id]})) 
            }
            return response.json(chat[0]);
            
        } catch (error) {
            return response.status(400).json(error);            
        }

    }
    
    async sendMessage(request: Request, response: Response){    
        const { id } = request.params;
        const { message } = request.body;
        const { userId } = response.locals;

        try {
            
            const chat = await Chat.findById(id)
            const newMessage = await Message.create({
                body: message,   
                sender: userId             
            })
            
            await chat?.messages?.push(newMessage);
            
            await chat?.save()

            return response.json(chat);
            
        } catch (error) {
            return response.status(400).json({ error: "Chat not found" });
        }
        
    }
    
    async findChats(response: Response){                
        const { userId } = response.locals;
        
        try {
            const chats = await Chat
                .find({users: userId})
                .populate({ 
                    path:'messages',
                    options: { limit: 15}
                })
                .populate({ 
                    path:'users',                    
                    options: { limit: 15}
                })
                        
            return response.json(chats);
            
        } catch (error) {
            return response.status(400).json(error);            
        }
            
    }

}

export default ChatController