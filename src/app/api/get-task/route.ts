import { DBconnect } from "@/lib/db";
import ResponseHelper from "@/lib/ResponseHelper";
import { Task } from "@/models/Task.models";

export async function POST(request: Request) {
    const { taskId, userId, limit = 10, page } = await request.json();   
    if (!userId) {
        return ResponseHelper.error("userId is required", 400)
    }

    const numLimit = parseInt(limit, 10);
    const numPage = parseInt(page, 10);
    const skip = (numPage - 1) * numLimit;

    if (taskId) {
        try {
            await DBconnect()
            const data = await Task.find({ userId, _id: taskId })
            return ResponseHelper.success(data, "Specific task detail here", 200)
        } catch (error) {
            console.log("Somthing went wrong in get-task route with taskId", error);
            return ResponseHelper.error("Internal server error", 500, error)
        }
    } else {
        try {
            await DBconnect()
            const allData = await Task.find({ userId }).skip(skip).limit(numLimit)
            const totalTasks = await Task.find({ userId }).countDocuments();
            const totalPages = Math.ceil(totalTasks / numLimit);

            return ResponseHelper.success({
                data: allData,
                pagination: {
                    page,
                    limit: numLimit,
                    totalTasks,
                    totalPages
                }
            }, "All tasks", 200)
        } catch (error) {
            console.log("Somthing went wrong in get-task route", error);
            return ResponseHelper.error("Internal server error", 500, error)
        }
    }
}