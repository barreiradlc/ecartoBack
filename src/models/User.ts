import mongoose, { Schema } from 'mongoose'
import bcrypt from "bcryptjs"

const UserSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },    
    instagram: {
        type: String,
        unique: true,        
        lowercase: true,
        required: false,
    },    
    image: {
        type: String
    },
    about: {
        type: String,
    },
    password: {
        type: String,        
        required: true,
        select: false
    },    
    recoverPassword: {
        type: String,                
        select: false
    },    
    createdAt:{
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        required: false,
    }    
})

UserSchema.pre('save', async function(next) {   
    
    (this as any).password = await bcrypt.hash((this as any).password, 12)        
    next()
})

export default mongoose.model('User', UserSchema)