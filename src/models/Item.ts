import mongoose from 'mongoose'
import Point from './Point'

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    nature: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    location: {
        type: Point,
        index: '2dsphere',
        select: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Item', ItemSchema)