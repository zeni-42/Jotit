import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { User } from "@/models/User.models"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    const { fullName, email, avatar } = await req.json()
    if (!fullName || !email || !avatar) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await DBconnect()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return ResponseHelper.error("This email is taken", 401)
        }

        const secret = process.env.TOKEN_SECRET
        if(!secret) {
            throw new Error("Token is missing")
        }

        const generatedToken = jwt.sign(
            {
                fullName,
                email,
                avatar
            },
            secret,
            { expiresIn: process.env.TOKEN_EXPIRY }
        )

        const gitHubUser = await User.create({
            fullName,
            email,
            avatar,
            usingGithub: true,
            token: generatedToken
        })
        if (!gitHubUser) {
            return ResponseHelper.error("Failed to register user", 410)
        }

        return ResponseHelper.success(gitHubUser, "User registerd successfull", 200)
        
    } catch (error) {
        console.log("Somthing went wrong in register-github-user route");
        return ResponseHelper.error("Failed to sign-up user", 500, error)
    }
}