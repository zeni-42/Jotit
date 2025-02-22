import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelpaer"
import { User } from "@/models/User.models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const { email, password } = await req.json()
    if(!email || !password){
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await DBconnect()

        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error("This user does not exist", 410)
        }

        const isValidPassword = bcrypt.compare(user.password, password)
        if (!isValidPassword) {
            return ResponseHelper.error("Invalid password")
        }

        const secret = process.env.TOKEN_SECRET
        if(!secret) {
            throw new Error("Token is missing")
        }

        const generatedToken = jwt.sign(
            {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                pass: user.password
            },
            secret,
            { expiresIn: process.env.TOKEN_EXPIRY }
        )

        if (generatedToken === null) {
            return ResponseHelper.error("Failed to generate token", 300)
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { token: generatedToken }
        ).select(
            "-password -token -createdAt -updatedAt -__v"
        )

        const cookie = await cookies()
        cookie.set("token", generatedToken,{ secure: true, httpOnly: true, maxAge: 60 * 60 * 24 * 2 })

        return ResponseHelper.success(updatedUser, "User logged in", 200)
    } catch (error) {
        console.log("Somthing went wrong in sign-in route");
        return ResponseHelper.error("Failed to sign-in user", 500, error)
    }
}