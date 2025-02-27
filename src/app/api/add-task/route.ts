import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { Task } from "@/models/Task.models"

export async function POST(req: Request) {
    const { userId, content, date } = await req.json()
    if (!userId || !content) {
        return ResponseHelper.error("All data required", 400)
    }    

    try {
        await DBconnect()
        const existingTaskofTheSameUser = await Task.findOne({
            userId, 
            task: content
        })
        if (existingTaskofTheSameUser) {
            return ResponseHelper.error("This task already exist", 460)
        }

        const task = await Task.create({
            userId,
            task: content
        })
        if (!task) {
            return ResponseHelper.error("Task creation failed", 406)
        }

        return ResponseHelper.success(task, "Task added successsfully", 200)
    } catch (error) {
        console.log("Somthing went wrong in add-task route", error);
        return ResponseHelper.error("Failed to add task", 500, error)
    }
}