import 'source-map-support/register';
import { deleteProduct } from '../businessLogic/product'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { ApiResponse } from "../response/ApiResponse";
import {getUserId} from "../utils/utils";

export const handler = middy(async (_event, _context) => {
    const userId = getUserId(_event);

    const productId = _event.pathParameters.productId;
    const product = await deleteProduct(userId, productId);
    return new ApiResponse().successResponse(200, 'item', product);
});

handler.use(cors());
