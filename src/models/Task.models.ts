import mongoose, { ObjectId, Schema } from "mongoose";

interface taskInterface extends Document {
    userId: ObjectId;
    title: string;
    description: string;
    status: 'in progress' | 'pending' | 'completed'
    priority: 'low' | 'medium' | 'high'
    dueDate: Date;
    tags: string
}

const taskSchema:Schema<taskInterface> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 100,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 300,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    priority: {
        type: String,
        required: true,
        default: "medium"
    },
    dueDate: {
        type: Date,
    },
    tags: {
        type: String,
        unique: true,
        trim: true,
        index: true
    }
}, { timestamps: true }) 

export const Task = mongoose.models.Task as mongoose.Model<taskInterface> ||  mongoose.model<taskInterface>("Task", taskSchema)