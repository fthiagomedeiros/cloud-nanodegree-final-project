import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent,
    APIGatewayTokenAuthorizerHandler
} from 'aws-lambda'

function verifyToken(authorizationToken: string) {
    if (!authorizationToken)
        throw new Error('No Auth Header');

    const split = authorizationToken.split(' ');
    const token = split[1];

    if (token != '123')
        throw new Error('Invalid Token')

    //Token is valid
}

export const handler: APIGatewayTokenAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    console.log('Token type: ', event.authorizationToken);

    try {
        verifyToken(event.authorizationToken);
        console.log("User authorized ", event.authorizationToken);
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
        console.log('Unauthorized ', event.authorizationToken);
        return {
            principalId: 'decodedToken.sub',
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
