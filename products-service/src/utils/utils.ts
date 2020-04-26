import { APIGatewayProxyEvent } from "aws-lambda";
import { decode } from 'jsonwebtoken'
import { JwtToken } from "../auth/JwtToken";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    return parseUserId(jwtToken)
}


/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtToken;
    return decodedJwt.sub
}
