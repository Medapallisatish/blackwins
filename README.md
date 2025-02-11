
This `README.md` file provides an overview of the project, installation instructions, database initialization, running the server, API endpoints, example request bodies, and license information.

# Blackwin Backend

This is the backend for the Blackwin project. It is built using Node.js, Express, and SQLite. The backend provides APIs to manage contacts, including creating, reading, updating, and deleting contacts.

## Project Structure
/d:/Blackwin/backend/ ├── initializeDb.js ├── index.js ├── blackwin.db ├── package.json

## API Endpoints
Get All Contacts
. URL: /contacts/
. Method: GET
. Response: JSON array of all contacts
Get Contact by ID
. URL: /contacts/:contactId/
. Method: GET
. Response: JSON object of the contact with the specified ID
Create a New Contact
. URL: /contacts/
. Method: POST
.  Request Body: JSON object with contact details
. Response: Success message
Update a Contact
. URL: /contacts/:contactId
. Method: PUT
. Request Body: JSON object with updated contact details
. Response: Success message
Delete a Contact
. URL: /contacts/:contactId/
. Method: DELETE
. Response: Success message



Example Request Bodies

##Create a New Contact
{
  "contactsDetails": {
    "contactId": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St",
    "createdAt": "2025-02-11"
  }
}

## Update a Contact
{
  "contactsDetails": {
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "phoneNumber": "0987654321",
    "address": "456 Main St",
    "createdAt": "2025-02-12"
  }
}
