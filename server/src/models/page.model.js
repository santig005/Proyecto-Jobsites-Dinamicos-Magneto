import mongoose from 'mongoose';


const pageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    id_user:{
        type: String,
        required: true
    },
    htmlCode: {
        type: String,
        required: true
    },
    cssCode: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: false
    },
    edition_time: {
        type: String,
        required: true
    },
    edition_date: {
        type: String,
        required: true
    }
});

export default mongoose.model('Page', pageSchema)