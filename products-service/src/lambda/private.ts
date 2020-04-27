import 'source-map-support/register';

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import {ApiResponse} from "../response/ApiResponse";
import {getUserId} from "../utils/utils";

export const handler = middy(async (_event, _context) => {
    const userId = getUserId(_event);
    return new ApiResponse().message(200, `{"message": "You are logged as ${userId}"}`);
});

handler.use(cors());
