import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { CreateProductRequest } from "../requests/CreateProductRequest";
import { createProduct } from '../businessLogic/product'

export const handler: APIGatewayProxyHandler = async (_event, _context) => {

  const newProduct: CreateProductRequest = JSON.parse(_event.body);
  const product = await createProduct(newProduct);

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  };

};
