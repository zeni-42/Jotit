import mongoose, { Document, mongo, Schema } from "mongoose";

interface userInterface extends Document {
    fullName: string,
    email: string,
    password: string,
    avatar: string,
    token: string,
    usingGithub: boolean
}

const userSchema:Schema<userInterface> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dfbtssuwy/image/upload/v1735838884/ljziqvhelksqmytkffj9.jpg",
    },
    token: {
        type: String,
    },
    usingGithub: {
        type: Boolean,
        default: false
    }
},  { timestamps: true })

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema)