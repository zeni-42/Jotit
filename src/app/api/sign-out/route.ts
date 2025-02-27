import ResponseHelper from "@/lib/ResponseHelper";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookie = await cookies()
        cookie.delete("token")

        return ResponseHelper.success({}, "Signed out", 200)
    } catch (error) {
        console.log("Somthing went wrong in sign-out route");
        return ResponseHelper.error("Failed to sign-out", 400, error)
    }
}