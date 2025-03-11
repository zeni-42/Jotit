import mongoose, { ObjectId, Schema, Document } from "mongoose";

interface taskInterface extends Document {
    userId: ObjectId;
    title: string;
    description: string,
    subtasks: ObjectId[],
    status: 'in progress' | 'pending' | 'completed'
    priority: 'low' | 'medium' | 'high'
    dueDate?: Date;
    isCompleted: boolean
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
        trim: true,
        max: 100,
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
    isCompleted: { 
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        trim: true,
        max: 300,
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
}, { timestamps: true }) 

export const Task = mongoose.models.Task as mongoose.Model<taskInterface> ||  mongoose.model<taskInterface>("Task", taskSchema)