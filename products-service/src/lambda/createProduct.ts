import 'source-map-support/register';
import { CreateProductRequest } from "../requests/CreateProductRequest";
import { createProduct } from '../businessLogic/product'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { ApiResponse } from "../response/ApiResponse";

export const handler = middy(async (_event, _context) => {
  const newProduct: CreateProductRequest = JSON.parse(_event.body);
  const product = await createProduct(newProduct);

  return new ApiResponse().successResponse(200, 'item', product);
});

handler.use(cors());
