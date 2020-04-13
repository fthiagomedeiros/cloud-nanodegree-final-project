import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { CreateProductRequest } from "../requests/CreateProductRequest";

export const handler: APIGatewayProxyHandler = async (_event, _context) => {

  const newProduct: CreateProductRequest = JSON.parse(_event.body);

  return {
    statusCode: 200,
    body: JSON.stringify(newProduct)
  };

};
