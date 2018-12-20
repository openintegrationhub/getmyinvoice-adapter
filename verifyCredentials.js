"use strict";
const request = require('request-promise');

module.exports = verify;

/**
 * Executes the verification logic by sending a simple to the Petstore API using the provided apiKey.
 * If the request succeeds, we can assume that the apiKey is valid. Otherwise it is not valid.
 *
 * @param credentials object to retrieve apiKey from
 *
 * @returns Promise sending HTTP request and resolving its response
 */
function verify(credentials) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = credentials.apiKey;
    const apiBaseUrl = credentials.apiBaseUrl;

    if (!apiKey) {
        throw new Error('API key is missing');
    }

    const requestOptions = { // TODO add Content-Type if normal request fails
        followAllRedirects: true,
        url: apiBaseUrl + '/getCountries', // TODO - this needs to be updated with a keep alive / ping url - we don't have it now in prod
        method: 'POST',
        json: true,
        body: {
            'api_key': apiKey
        }
    };

    // if the request succeeds, we can assume the api key is valid
    return request(requestOptions);
}
