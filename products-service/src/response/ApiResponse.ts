import { APIGatewayProxyResult } from "aws-lambda";

export class ApiResponse {

    successResponse(statusCode: number, key: string, items: any): APIGatewayProxyResult {
        return {
            statusCode: statusCode,
            body: JSON.stringify({
                [ key ] : items
            })
        }
    }

    message(statusCode: number, message: string): APIGatewayProxyResult {
        return {
            statusCode: statusCode,
            body: message
        }
    }

}
