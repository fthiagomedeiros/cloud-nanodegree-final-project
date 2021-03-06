
export const putProduct = (signedUrl, image) => {
    console.log(signedUrl);
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'image/jpeg'},
        body: image
    };

    fetch(signedUrl, requestOptions)
        .then(response => {
            if (response.ok) return true;
            throw new Error(response.message);
        }).then(response => {
        if (response === true) {return 'OK'}
        else { return response }
    })

};


export const postProduct = (body, image, token) => {
    console.log('postProduct got here >>>> ' + image);
    const requestOptions = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`,
                   'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    console.log(JSON.stringify(body))
    fetch('/products', requestOptions)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.message);
        }).then(response => {
            putProduct(response.item.urlForUpload, image)
    })

};

export const patchProduct = (id, body, token) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    console.log(JSON.stringify(body))
    fetch(`/products/${id}`, requestOptions)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.message);
        }).then(response => {
            console.log(response)
    })
}

