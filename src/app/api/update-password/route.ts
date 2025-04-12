import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { User } from "@/models/User.models"
import bcrypt from "bcryptjs"

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")
    const oldPass = url.searchParams.get("oldPass")
    const newPass = url.searchParams.get("newPass")
    if (!userId || !oldPass || !newPass) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await DBconnect()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const validPass = await bcrypt.compare(oldPass, user.password)
        if (!validPass) {
            return ResponseHelper.error("Invalid credentials", 478)
        }

        const newHashedPassword = await bcrypt.hash(newPass, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                password: newHashedPassword 
            }
        )
        return ResponseHelper.success({}, "Password updated successfully", 200)

    } catch (error) {
        console.log("Somthing went wrong in update-password route", error);
        return ResponseHelper.error("Internal server error", 500, error)
    }
}