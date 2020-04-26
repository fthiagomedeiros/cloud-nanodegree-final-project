import * as uuid from 'uuid'
import { CreateProductRequest } from "../requests/CreateProductRequest";
import { ProductAccess } from "../dataLayer/productsAccess";
import { Product } from "../models/Product";
import {UpdateProductRequest} from "../requests/UpdateProductRequest";

const productAccess = new ProductAccess();

export async function createProduct(
    userId: string,
    createProductRequest: CreateProductRequest): Promise<Product> {

    return await productAccess.createProduct({
        id: uuid.v4(),
        companyId: userId,
        name: createProductRequest.name,
        description: createProductRequest.description,
        price: createProductRequest.price
    });
}

export async function getProductsBy(userId: string): Promise<Product[]> {
    return await productAccess.getProducts(userId);
}

export async function updateProduct(
    userId: string,
    productId: string,
    updateProductRequest: UpdateProductRequest): Promise<Product> {

    return await productAccess.updateProduct(productId, {
        id: productId,
        companyId: userId,
        name: updateProductRequest.name,
        description: updateProductRequest.description,
        price: updateProductRequest.price
    });
}

export async function deleteProduct(userId: string, productId: string) {
    return await productAccess.deleteProduct(userId, productId);
}
