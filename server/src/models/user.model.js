import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin']
        }
    }
);
export default mongoose.model('User', userSchema)