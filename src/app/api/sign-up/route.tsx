import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelpaer"
import { User } from "@/models/User.models"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { fullName, email, password } = await req.json()
    if (!fullName || !email || !password) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await DBconnect()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return ResponseHelper.error("This email is taken", 401)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        const createdUser = await User.findById(user._id).select(
            "-password -token -createdAt -updatedAt -__v"
        )
        if (!createdUser) {
            return ResponseHelper.error("Failed to create user", 410)
        }

        return ResponseHelper.success(createdUser, "User created successfully", 200)

    } catch (error) {
        console.log("Somthing went wrong in sign-in route");
        return ResponseHelper.error("Failed to register user", 500, error)
    }
}