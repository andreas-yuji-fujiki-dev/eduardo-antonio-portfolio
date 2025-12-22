import { ResponseErrorCase } from "../types/response-error";

export function makeErrorResponse(
    error: unknown,
    message: string
): ResponseErrorCase {
    return {
        status: "500 - Internal server error",
        error: message,
        details: error instanceof Error ? error.message : String(error)
    };
}
