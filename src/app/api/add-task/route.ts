import { DBconnect } from "@/lib/db"
import ResponseHelper from "@/lib/ResponseHelper"
import { Task } from "@/models/Task.models"
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const { userId, title, description, date, priority} = await req.json()
    if (!userId || !title) {
        return ResponseHelper.error("All data required", 400)
    }    

    try {
        await DBconnect()

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("This user does not exist", 404)
        }

        const existingTaskofTheSameUser = await Task.findOne(
            {
                userId, title, description
            }
        )
        if (existingTaskofTheSameUser) {
            return ResponseHelper.error("This task already exist", 460)
        }

        const taskData: any = { userId, title, description }

        if (date) {
            taskData.dueDate = date
        }

        if(priority){
            taskData.priority = priority
        }

        const task = await Task.create(taskData)
        if (!task) {
            return ResponseHelper.error("Task creation failed", 406)
        }

        return ResponseHelper.success(task, "Task added successsfully", 200)
    } catch (error) {
        console.log("Somthing went wrong in add-task route", error);
        return ResponseHelper.error("Failed to add task", 500, error)
    }
}