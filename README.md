# getmyinvoices-adapter

[GetMyInvoices](https://getmyinvoices.com) is the central invoice management software for your business with automated fetching of invoices and bank statements from over 4500 online portals, collection of email bills, paper receipts scanning and many more features that simplify your accounting processes. It helps you to collect, find and transfer incoming invoices to other book keeping services. Only a few mouse clicks are necessary. 

This **adapter** connects [GetMyInvoices](https://getmyinvoices.com) with third-party applications. With this **adapter** you can create different application flows. It supports **"Triggers"** (e.g. ``getDocumentsPolling``) as well as **"Actions"** (e.g. ``lookupDocument``).

## Before you begin

Before you can use the component you **must be a registered GetMyInvoices user**. Please visit the home page of [https://getmyinvoices.com](https://getmyinvoices.com) to sign up (free trial is also available).

After registration you need to login to [GetMyInvoices](https://getmyinvoices.com) and create an **API Key** by navigating to **API Access** under account menu and then click on **ADD APIKEY**.

Once the **API Key** is created, you can use that to make a request to GetMyInvoices.

## Actions and triggers
The initial version of the **adapter** supports the following **actions** and **triggers**: (more will be added soon!)

#### Triggers:
  - Get Documents - polling (```getDocumentsPolling.js```)
  Triggers are of type '*polling'* which means that the **trigger** will be scheduled to execute periodically. It will fetch only these objects from the database that have been modified or created since the previous execution. Then it will emit one message per object that changes or is added since the last polling interval.
  
#### Actions:
  - Lookup Document (```lookupDocument.js```)

> **NOTE:** As mentioned before, to perform an action or a call trigger you have to be a registered [GetMyInvoices](https://getmyinvoices.com) user and you need to pass your **API Key**.

##### Get Documents

Get Documents trigger (```getDocumentsPolling.js```) performs a request which fetches all new and updated documents saved by a user under documents page in [GetMyInvoices](https://getmyinvoices.com).

##### Lookup Document

Get single document content with meta info given a document id (prim_uid of the document found in Get Documents response).

###### Required parametes:
  - ``document_prim_uid`` - unique document uid that is sent in the getDocuments response
 
 
## License

Apache-2.0 © [GetMyInvoices](https://getmyinvoices.com)
