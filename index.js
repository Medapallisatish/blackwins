const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const initializeDb = require("./initializeDb"); 

const app = express();
const dbPath = path.join(__dirname, "blackwin.db");
let db = null;

const initializeDbServer = async () => {
  try {
    await initializeDb();
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Database Error: ${e.message}`);
  }
};
initializeDbServer();

app.use(express.json()); 

// Get contacts API
app.get("/contacts/", async (request, response) => {
  const getContactsQuery = `
    SELECT 
    *
    FROM 
    contact
    ORDER BY
    contact_id;`;

  const contactsQuery = await db.all(getContactsQuery);
  response.send(contactsQuery);
});

// Get contact by ID API
app.get("/contacts/:contactId/", async (request, response) => {
  const { contactId } = request.params;
  const getContactQuery = `
    SELECT
    *
    FROM
    contact
    WHERE
    contact_id=${contactId};`;

  const contactQuery = await db.get(getContactQuery);
  console.log("Fetched Contact:", contactQuery); 
  response.send(contactQuery);
});

// Post contact API
app.post("/contacts/", async (request, response) => {
  const { contactsDetails } = request.body;
  console.log("Received Contact Details:", contactsDetails);
  const {
    contactId: newContactId,
    name,
    email,
    phoneNumber,
    address,
    createdAt,
  } = contactsDetails;

  const addContactQuery = `
    INSERT INTO
    contact(contact_id, name, email, phone_number, address, created_at)
    VALUES
    (
        ${newContactId},
        '${name}',
        '${email}',
        '${phoneNumber}',
        '${address}',
        '${createdAt}'
    );`;

  try {
    await db.run(addContactQuery);
    response.send("Contact added successfully");
  } catch (error) {
    console.error("Error adding contact:", error);
    response.status(500).send("Error adding contact");
  }
});

// Put contact API
app.put("/contacts/:contactId", async (request, response) => {
  const { contactId } = request.params;
  const { contactsDetails } = request.body;
  console.log("Received Update Details:", contactsDetails); 

  const {
    name,
    email,
    phoneNumber,
    address,
    createdAt,
  } = contactsDetails;

  const updateContactQuery = `
    UPDATE
    contact
    SET
    name = '${name}',
    email = '${email}',
    phone_number = '${phoneNumber}',
    address = '${address}',
    created_at = '${createdAt}'
    WHERE
    contact_id = ${contactId};`;

  try {
    await db.run(updateContactQuery);
    response.send("Contact details updated successfully");
  } catch (error) {
    console.error("Error updating contact:", error);
    response.status(500).send("Error updating contact");
  }
});

// Delete contact API
app.delete("/contacts/:contactId/", async (request, response) => {
  const { contactId } = request.params;
  const deleteContactQuery = `
    DELETE FROM
    contact
    WHERE
    contact_id = ${contactId};`;

  try {
    await db.run(deleteContactQuery);
    response.send("Contact deleted successfully");
  } catch (error) {
    console.error("Error deleting contact:", error);
    response.status(500).send("Error deleting contact");
  }
});