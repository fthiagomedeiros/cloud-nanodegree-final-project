import 'source-map-support/register';
import { getProductsBy } from '../businessLogic/product'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { ApiResponse } from "../response/ApiResponse";
import { getUserId } from "../utils/utils";

export const handler = middy(async (_event, _context) => {
  const userId = getUserId(_event);
  const products = await getProductsBy(userId);

  return new ApiResponse().successResponse(201, 'items', products);
});

handler.use(cors());
