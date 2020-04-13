import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS  from 'aws-sdk'
import { Product } from '../models/Product'


export class ProductAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly table = process.env.PRODUCT_TABLE) {
    }

    async createProduct(product: Product): Promise<Product> {
        await this.docClient.put({
            TableName: this.table,
            Item: product
        }).promise();

        return product
    }

}


function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new AWS.DynamoDB.DocumentClient()
}
