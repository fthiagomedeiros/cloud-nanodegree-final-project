# cloud-nanodegree-final-project
Approach: __Serverless__

An ecommerce must have a product registration service API.
This project allows an API logged user to manage their product list.

### Project description overview 

the endpoints provided are located in [Products-Service AWS.postman_collection](https://github.com/fthiagomedeiros/cloud-nanodegree-final-project/blob/dev/docs/screenshots/Products-Service%20AWS.postman_collection.json).
You can import this collection into Postman client and use it.

The requests must follow the validations provided as JSONSchemas located in [validator folder](https://github.com/fthiagomedeiros/cloud-nanodegree-final-project/tree/dev/docs/screenshots/products-service/validator)
These validations only are provided to the backend and not provided at React Frontend built (once the course focuses are in the backend service).

The system use flow is provided into [screenshot folder](https://github.com/fthiagomedeiros/cloud-nanodegree-final-project/tree/dev/docs/screenshots/screenshots)

### Features implemented

1. The user is able to CREATE, UPDATE and DELETE products.
2. The application allows users to upload a file. (When creating a new product, you can submit an image to the product)

### Code styling

The code is split into multiple layers separating business logic from I/O related code.
The Hexagonal pattern is used to provide a separation of concerns through the code.
