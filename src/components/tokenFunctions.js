import axios from 'axios';

/*
* Utilizar las credenciales generadas al crear
* una aplicación OAUTH2 en Liferay.s
*/
const client_id = "XXXXXXXXXXXX";
const client_secret = "XXXXXXXXXXXXXXX";

var token_data = {
    data: {
        access_token: ""
    }
};

/**
 * Función que recupera un token OAUTH2 de Liferay si no existe.
 * Devuelve siempre una Promesa, resulta en el caso
 * de encontrar un token almacenado en el sistema.
 */
function getToken() {
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
