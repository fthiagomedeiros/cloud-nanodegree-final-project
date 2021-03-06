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

    async getProducts(userId: string): Promise<Product[]> {
        return await this.database.get(userId);
    }

    async updateProduct(productId: string, product: Product): Promise<Product> {
        console.log('update product ', productId, ' with data ', product );
        await this.database.update(productId, product);
        return product
    }

    async deleteProduct(userId: string, productId: string) {
        console.log('delete product ', productId);
        await this.database.delete(userId, productId);
    }

}




