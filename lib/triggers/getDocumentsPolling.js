"use strict";
const co = require('co');
const request = require('request-promise');
const messages = require('elasticio-node').messages;



exports.process = processTrigger;

/**
 * Executes the trigger's logic by sending a request to the GetMyInvoices API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 * Please note that the function is using co, a generator based control library, that allows you to use functionality
 * from the async/await proposal.
 *
 * See https://github.com/tj/co
 * See https://github.com/tc39/ecmascript-asyncawait
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and apiBaseUrl
 * @returns promise resolving a message to be emitted to the platform
 */
function processTrigger(msg, cfg) {
    const iamToken = process.env.ELASTICIO_IAM_TOKEN;
    const self = this;

    // access the value of the apiKey field defined in credentials section of component.json
    const apiKey = cfg.apiKey;

    // access the value of the apiBaseUrl field defined in credentials section of component.json
    const API_BASE_URI = cfg.apiBaseUrl;



    msg.body = msg.body || {};

    msg.body.api_key = apiKey; // because we need to pass apiKey in the request body for GetMyInvoices api

    // Returns a generator based control flow using co. Please note that co returns a Promise.
    return co(function*() {

        console.log('About to call listDocuments API with url ' + API_BASE_URI + '/listDocuments');
        console.log('Request body is ' + JSON.stringify(msg.body, null, 2));

        const requestOptions = {
            uri: `${API_BASE_URI}/listDocuments`,
            followAllRedirects: true,
            body: msg.body,
            json: true
        };

        // yielding the response
        let response = yield request.post(requestOptions);


        console.log("Response from listDocuments is : " + JSON.stringify(response, null, 2));

        const documentCount = response.records.length;

        console.log('Got %s Documents', documentCount);

        const getApplicationUid = {
            uri: `http://component-repository.openintegrationhub.com/components/${process.env.ELASTICIO_COMP_ID}`,
            json: true,
            headers: {
                "Authorization" : `Bearer ${iamToken}`,
                }
        };
    
        const applicationUidResponse = await request.get(getApplicationUid);
    
        const appUid = applicationUidResponse.data.applicationUid;

        let meta = {
            applicationUid: (appUid!=undefined && appUid!=null) ? appUid : 'appUid not set yet',
            iamToken: (iamToken!=undefined && iamToken!=null) ? iamToken : 'iamToken not set yet',
        }
        let contentWithMeta;

        if(documentCount > 0) {
            response.records.forEach(elem => {

                meta.recordUid = elem.prim_uid;
                delete elem.prim_uid;
                contentWithMeta = {
                    meta,
                    data: elem
                };

                console.log('Emitting data');
                self.emit('data', messages.newMessageWithBody(contentWithMeta));
            });
        }
        /*if (documentCount) {
            
            // this message will be emitted to the platform
            return messages.newMessageWithBody(response);
        }*/

    });
}