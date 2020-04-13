import { Product } from '../models/Product'
import { createDynamoService } from "../services/DynamoStorage";
import { getUploadUrl } from "../services/S3Storage";

export class ProductAccess {

    constructor(
        private readonly database = createDynamoService(),
        private readonly table = process.env.PRODUCT_TABLE) {
    }

    async createProduct(product: Product): Promise<Product> {
        await this.database.put({
            TableName: this.table,
            Item: product
        }).promise();

        product.urlForUpload = getUploadUrl(product.id);
        return product
    }

}




