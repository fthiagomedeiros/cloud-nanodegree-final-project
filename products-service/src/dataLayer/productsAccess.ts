import { Product } from '../models/Product'
import { DynamoStorage, Storage } from "../services/DynamoStorage";
import { FileStorage, S3Storage } from "../services/S3Storage";

export class ProductAccess {

    constructor(
        private readonly database: Storage = new DynamoStorage(),
        private readonly fileStorage: FileStorage = new S3Storage()) {
    }

    async createProduct(product: Product): Promise<Product> {
        await this.database.save(product);
        product.urlForUpload = this.fileStorage.generateUploadUrl(product.id);
        return product
    }

}




