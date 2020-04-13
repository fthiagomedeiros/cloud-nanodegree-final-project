import * as uuid from 'uuid'
import { CreateProductRequest } from "../requests/CreateProductRequest";
import { ProductAccess } from "../dataLayer/productsAccess";
import { Product } from "../models/Product";

const productAccess = new ProductAccess();

export async function createProduct(
    createProductRequest: CreateProductRequest): Promise<Product> {

    return await productAccess.createProduct({
        companyId: "1001",
        productId: uuid.v4(),
        name: createProductRequest.name,
        description: createProductRequest.description,
        price: createProductRequest.price
    });
}
