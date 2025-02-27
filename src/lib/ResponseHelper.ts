class ResponseHelper{
    public static success(data: any, message = "Successfully", status = 200): Response {
        return new Response(
            JSON.stringify({
                data,
                success: true,
                message,
                status
            }),{ status }
        )
    }

    public static error(message = "An error occurred", status = 400, errors: any = null): Response {
        return new Response(
            JSON.stringify({
                status,
                success: false,
                message,
                errors,
            }),
            { status }
        );
    }
}

export default ResponseHelper