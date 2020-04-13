import { Product } from '../models/Product'
import { DynamoStorage } from "../services/DynamoStorage";
import {S3Storage} from "../services/S3Storage";

export class ProductAccess {

    constructor(
        private readonly database = new DynamoStorage(),
        private readonly fileStorage = new S3Storage()) {
    }

    async createProduct(product: Product): Promise<Product> {
        await this.database.save(product);
        product.urlForUpload = this.fileStorage.getUploadUrl(product.id);
        return product
    }

}




