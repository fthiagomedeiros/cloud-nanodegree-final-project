// S3 Client
import * as AWS from "aws-sdk";

export interface FileStorage {
    generateUploadUrl(productId: string)
}

export class S3Storage implements FileStorage{
    generateUploadUrl(productId: string) {
        return createS3Client().getSignedUrl('putObject', {
            Bucket: process.env.PRODUCTS_IMAGES_BUCKET,
            Key: productId,
            Expires: 300
        })
    }
}

function createS3Client() {
    return new AWS.S3({
        signatureVersion: "v4"
    });
}


