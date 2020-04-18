import * as uuid from 'uuid'
import { CreateProductRequest } from "../requests/CreateProductRequest";
import { ProductAccess } from "../dataLayer/productsAccess";
import { Product } from "../models/Product";
import {UpdateProductRequest} from "../requests/UpdateProductRequest";

const productAccess = new ProductAccess();

export async function createProduct(
    createProductRequest: CreateProductRequest): Promise<Product> {

    return await productAccess.createProduct({
        id: uuid.v4(),
        companyId: "1001",
        name: createProductRequest.name,
        description: createProductRequest.description,
        price: createProductRequest.price
    });
}

export async function getProducts(): Promise<Product[]> {
    return await productAccess.getProducts();
}

export async function updateProduct(
    productId: string,
    updateProductRequest: UpdateProductRequest): Promise<Product> {

    return await productAccess.updateProduct(productId, {
        id: productId,
        companyId: "1001",
        name: updateProductRequest.name,
        description: updateProductRequest.description,
        price: updateProductRequest.price
    });
}

export async function deleteProduct(productId: string) {
    return await productAccess.deleteProduct(productId);
}
