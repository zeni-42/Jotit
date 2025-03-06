import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { User } from "@/models/User.models"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")
    if (!userId) {
        return ResponseHelper.error("UserId is required", 400)
    }
    try {
        await DBconnect()

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("user not found", 404)
        }

        return ResponseHelper.success(user, "User details", 200)
    } catch (error) {
        console.log("Somthing went wrong in get-user route", error);
        return ResponseHelper.error("Internal server error", 500, error)
    }
}