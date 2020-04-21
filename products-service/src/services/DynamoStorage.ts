import * as AWS from "aws-sdk";
import {Product} from "../models/Product";

export interface Storage {
    save(product: Product): Promise<Product>
    update(productId: string, product: Product)
    delete(userId: string, productId: string)
    get(userId: string);
}

export class DynamoStorage implements Storage {

    constructor(
        private readonly dynamo = createClient(),
        private readonly table = process.env.PRODUCT_TABLE,
        private readonly productIndex = process.env.PRODUCT_TABLE_INDEX) {
    }

    async save(product: Product): Promise<Product> {
        await this.dynamo.put({
            TableName: this.table,
            Item: product
        }).promise();

        return product
    }

    async update(productId: string, product: Product) {
        console.log('productId', productId, ' into svc ', product);

        await this.dynamo.update({
            TableName: this.table,
            Key: {
                'productId': productId,
                'companyId': '1001'
            },
            UpdateExpression: 'set #field_name = :name, description = :description, price = :price',
            ExpressionAttributeValues: {
                ':name' : product.name,
                ':description' : product.description,
                ':price' : product.price
            },
            ExpressionAttributeNames:{
                "#field_name": "name"
            },
            ReturnValues:"UPDATED_NEW"
        }).promise()
    }

    async delete(userId: string, productId: string) {
        console.log('Deleting ', productId);

        return await this.dynamo.delete({
            TableName: this.table,
            Key: {
                'id': productId,
                'companyId': userId
            }
        }).promise();
    }

    async get(userId: string) : Promise<Product[]> {
        console.log('Getting all Todos for the logged user ', userId);

        const result = await this.dynamo.query({
            TableName: this.table,
            IndexName: this.productIndex,
            KeyConditionExpression: 'companyId = :companyId',
            ExpressionAttributeValues:{
                ':companyId': userId
            }
        }).promise();
        return result.Items as Product[]
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

