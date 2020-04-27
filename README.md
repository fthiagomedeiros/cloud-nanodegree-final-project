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


### Running the client

To run the react project, just type into the folder 'products-react-client'
```node
npm run start
``` 


### Features implemented

1. The user is able to CREATE, UPDATE and DELETE products.
2. The application allows users to upload a file. (When creating a new product, you can submit an image to the product)

### Code styling

The code is split into multiple layers separating business logic from I/O related code.
The Hexagonal pattern is used to provide a separation of concerns through the code.


### Project Rubric Requirements

__(Option 2): Functionality__


```coffeescript
The application allows users to create, update, delete items OK
The application allows users to upload a file. OK
The application only displays items for a logged in user. OK
Authentication is implemented and does not allow unauthenticated access. OK
```

__(Option 2):Codebase__

```coffeescript
The code is split into multiple layers separating business logic from I/O related code. OK
Code is implemented using async/await and Promises without using callbacks. OK
```

__(Option 2):Best practices__

```coffeescript
All resources in the application are defined in the "serverless.yml" file OK
Each function has its own set of permissions. OK
Application has sufficient monitoring. OK
HTTP requests are validated OK
```

__(Option 2):Architecture__

```coffeescript
Data is stored in a table with a composite key. OK
Scan operation is not used to read data from a database. OK
```


Additional features

