"use strict";
const co = require('co');
const request = require('request-promise');
const messages = require('elasticio-node').messages;



exports.process = processAction;

/**
 * Executes the action's logic by sending a request to the GetMyInvoices API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and apiBaseUrl
 * @returns promise resolving a message to be emitted to the platform
 */
function processAction(msg, cfg) {

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;

    // access the value of the apiBaseUrl field defined in credentials section of component.json
    const API_BASE_URI = cfg.apiBaseUrl;

    msg.body = msg.body || {};

    msg.body.api_key = apiKey; // because we need to pass apiKey in the request body for GetMyInvoices api

    // body contains the mapped data
    const body = msg.body;

    // fetch the document_prim_uid into docUID field of the in-metadata
    const docUID = body.document_prim_uid;

    if (!docUID) {
        throw new Error('Document prim uid is required');
    }

    console.log('About to fetch document object for: ' + docUID);

    const requestOptions = {
        uri: `${API_BASE_URI}/getDocument`,
        followAllRedirects: true,
        body: msg.body,
        json: true
    };

    // Returns a generator based control flow using co. Please note that co returns a Promise.
    return co(function* gen() {
        const response = yield request.post(requestOptions);
        return messages.newMessageWithBody(response);
    });
}
