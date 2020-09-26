import mongoose from 'mongoose'

export interface IChat extends mongoose.Document {
    messages?: [IMessage]; 
    users: [number]; 
  };
    
  export interface IUser extends mongoose.Document {
    id: string;         
  };
  
  export interface IMessage extends mongoose.Document {
    body: string | null;     
  };
  
const ChatSchema = new mongoose.Schema({
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
})

  

const Chat = mongoose.model<IChat>('Chat', ChatSchema)
export default Chat