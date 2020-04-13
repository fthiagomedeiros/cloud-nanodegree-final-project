import * as AWS from "aws-sdk";


export function createS3Client() {
    return new AWS.S3({
        signatureVersion: "v4"
    });
}

export function getUploadUrl(productId: string) {
    return createS3Client().getSignedUrl('putObject', {
        Bucket: process.env.PRODUCTS_IMAGES_BUCKET,
        Key: productId,
        Expires: 300
    })
}



