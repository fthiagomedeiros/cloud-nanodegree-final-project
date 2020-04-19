import 'source-map-support/register';

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import {ApiResponse} from "../response/ApiResponse";

export const handler = middy(async (_event, _context) => {
    return new ApiResponse().message(200, '{"message": "Hello from a PrivateApi at AWS ApiGateway"}');
});

handler.use(cors());
