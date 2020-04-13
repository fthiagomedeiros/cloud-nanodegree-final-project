import * as AWS from "aws-sdk";
import { Product } from "../models/Product";

export class DynamoStorage {

    constructor(
        private readonly dynamo = createClient(),
        private readonly table = process.env.PRODUCT_TABLE) {
    }

    async save(product: Product): Promise<Product> {
        await this.dynamo.put({
            TableName: this.table,
            Item: product
        }).promise();

        return product
    }

}

function createClient() {
    if (process.env.IS_OFFLINE) {
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new AWS.DynamoDB.DocumentClient()
}

