import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler
} from 'aws-lambda'

import { verify } from 'jsonwebtoken'
import { JwtToken } from "./JwtToken";

const secret = process.env.AUTH0_SECRET;

function verifyToken(authorizationToken: string): JwtToken {
    if (!authorizationToken)
        throw new Error('No Auth Header');

    const split = authorizationToken.split(' ');
    const token = split[1];

    console.log(secret);
    return verify(token, secret) as JwtToken;
}

export const handler: APIGatewayTokenAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    console.log('Token type: ', event.authorizationToken);

    try {
        const decodedToken = verifyToken(event.authorizationToken);
        console.log("User authorized ", decodedToken.sub);
        return {
            principalId: decodedToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    } catch (e) {
        console.log('Unauthorized ', event.authorizationToken);
        return {
            principalId: 'no_valid_user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }


};
