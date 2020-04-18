import 'source-map-support/register';
import { getProducts } from '../businessLogic/product'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { ApiResponse } from "../response/ApiResponse";

export const handler = middy(async (_event, _context) => {
  const product = await getProducts();

  return new ApiResponse().successResponse(201, 'items', product);
});

handler.use(cors());
