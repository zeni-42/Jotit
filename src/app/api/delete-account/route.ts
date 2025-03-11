import { DBconnect } from "@/lib/db";
import ResponseHelper from "@/lib/ResponseHelper";
import { Task } from "@/models/Task.models";
import { User } from "@/models/User.models";
import { cookies } from "next/headers";

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    try {
        await DBconnect()

        // Verifing if the user even exist
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("this user does not exist", 401)
        }
        
        // Removing the tasks
        await Task.deleteMany({ userId })

        // Deleting the user
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) {
            return ResponseHelper.error("failed to delete user")
        }

        // Cleaning cookie 
        const cookie = await cookies()
        cookie.delete("token")


        return ResponseHelper.success({}, "User deleted successfully")
    } catch (error) {
        console.log("Somthing went wrong in delete-account route");
        return ResponseHelper.error("Internal server error", 500, error)
    }
}