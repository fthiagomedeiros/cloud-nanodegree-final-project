import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler
} from 'aws-lambda'

export const handler: APIGatewayTokenAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    console.log('Token type: ', event.authorizationToken);

    if (!event.authorizationToken) {
        console.log('Unauthorized ', event);

        return {
            principalId: 'user',
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

    try {
        // const decodedToken = await verifyToken(event.authorizationToken);
        console.log("User authorized ", event);

        return {
            principalId: "decodedToken.sub",
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
        console.log('Unauthorized ', event);

        return {
            principalId: 'user',
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
