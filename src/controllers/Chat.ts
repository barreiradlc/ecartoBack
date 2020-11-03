import { Request, Response } from 'express';

import Chat, { IMessage } from '../models/Chat'
import Message from '../models/Message';

class ChatController {
    async createOrFindChatRoom(request: Request, response: Response){
        const { id } = request.params;
        const { userId } = response.locals;     

        try {
            
            const chat = await Chat
                .find({
                    users: {
                        $all: [userId, id]
                    },
                })
                .populate({ 
                    path:'users',
                    select: 'name image',
                    options: { limit: 15}
                })
                .populate({ 
                    path:'messages',
                    options: { limit: 15}
                })

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

            return response.json(newMessage);
            
        } catch (error) {
            return response.status(400).json({ error: "Chat not found" });
        }
        
    }
    
    async findChats(request: Request, response: Response){                           
        const { userId } = response.locals;                 

        try {
            
            const chats = await Chat
                .find({users: userId})
                .populate({ 
                    path:'users',
                    select: 'name image',
                    options: { limit: 15}
                })
                .populate({ 
                    path:'messages',
                    options: { limit: 15}
                })
                                        
            return response.json(chats);
            
        } catch (error) {
            return response.status(400).json(error);            
        }
            
    }

}

export default ChatController