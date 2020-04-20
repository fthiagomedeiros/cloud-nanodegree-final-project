import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler
} from 'aws-lambda'

import { verify } from 'jsonwebtoken'
import { JwtToken } from "./JwtToken";
import * as AWS from 'aws-sdk';

const ssm = new AWS.SSM();

function verifyToken(authorizationToken: string, secret: string): JwtToken {
    if (!authorizationToken)
        throw new Error('No Auth Header');

    const split = authorizationToken.split(' ');
    const token = split[1];

    console.log(secret);
    return verify(token, secret) as JwtToken;
}

export const handler: APIGatewayTokenAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    console.log('Token type: ', event.authorizationToken);

    const secret = await ssm.getParameters({
        Names: ['/autho/secret'],
        WithDecryption: true,
    }).promise().then(data => data.Parameters.length ? data.Parameters[0].Value :
        Promise.reject(new Error(`SSM Parameter is not set.`)));

    console.log('Secret GOT >>>>', secret);

    try {
        const decodedToken = verifyToken(event.authorizationToken, secret);
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
