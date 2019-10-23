import axios from 'axios';

const client_id = "mi-app-de-clases-client-id";
const client_secret = "mi-app-de-clases-super-secret";

var token_data = {
    data: {
        access_token: ""
    }
};

function getToken() {
    console.log("Entramos a por el token");
    if (token_data.data.access_token === "") {
        const tokenParams = new URLSearchParams();
        tokenParams.append('client_id', client_id);
        tokenParams.append('client_secret', client_secret);
        tokenParams.append('grant_type', "client_credentials");
        var promise = axios.post('http://localhost:8080/o/oauth2/token', tokenParams);
        promise.then(result => {
            token_data = result;
        });
        return promise;
    } else {
        return Promise.resolve(token_data);
    }

}

export default getToken
