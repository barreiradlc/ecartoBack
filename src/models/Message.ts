import mongoose from 'mongoose'

export interface IMessage extends mongoose.Document {
    body: string;     
    createdAt?: Date;
    read?: Boolean;
    sender: String;
};

const MessageSchema = new mongoose.Schema({
    body: {
        type: String,
        select: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    read: {
        type: Boolean,        
    },
})

const Message = mongoose.model<IMessage>('Message', MessageSchema)
export default Message