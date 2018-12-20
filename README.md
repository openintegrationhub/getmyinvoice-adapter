### GetMyInvoices Component for Open Integration Hub

#### This work is in progress ###

**Following notes are for the developers**

Connectors have been created for the following APIs,
* https://api.getmyinvoices.com/accounts/v2/listDocuments
* https://api.getmyinvoices.com/accounts/v2//getDocument


Points to be finalised and fixed

1. /listDocuments api has JSON schemas, but it should not be necessary (to be verified). If schemas are mandated, we need to create schemas for getDocument api also.
2. component.json has a credentials object, which I think is not necessary (credentials are handled in makeRequest method in getmyinvoices.js file)
3. We need to create test cases for mocha and test it once.
4. The connector has adapters specific to just the two APIs listed above, should it be generic as in sugar-crm example?


