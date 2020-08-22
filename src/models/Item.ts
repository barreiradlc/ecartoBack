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
    nature: {
        type: String,
        required: true
    },        
    price:{
        type: Number,           
    },
    location:{
        type: Point,
        index:'2dsphere',
        select: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// title
// description
// nature
// price
// latitude
// longitude
// image

export default mongoose.model('Item', ItemSchema)