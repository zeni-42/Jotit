import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { Task } from "@/models/Task.models"

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const taskId = url.searchParams.get("taskId")
    if (!taskId) {
        return ResponseHelper.error("taskId is required", 400)
    }

    try {
        await DBconnect()

        const task = await Task.findById( taskId )
        if (!task) {
            return ResponseHelper.error("Task does not exist", 404)
        }

        await Task.findByIdAndUpdate(taskId,
            { isCompleted: true }
        )

        return ResponseHelper.success({}, "Completed", 200)
    } catch (error) {
        console.log("Somthing went wrong in update-complete route", error);
        return ResponseHelper.error("Internal server error", 500, error)
    }
}