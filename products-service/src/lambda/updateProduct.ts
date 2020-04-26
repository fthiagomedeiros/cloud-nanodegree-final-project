import 'source-map-support/register';
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { updateProduct } from '../businessLogic/product'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { ApiResponse } from "../response/ApiResponse";
import {getUserId} from "../utils/utils";

export const handler = middy(async (_event, _context) => {
    const newProduct: UpdateProductRequest = JSON.parse(_event.body);

    const userId = getUserId(_event);
    const productId = _event.pathParameters.productId;
    const product = await updateProduct(userId, productId, newProduct);

    return new ApiResponse().successResponse(200, 'item', product);
});

handler.use(cors());
