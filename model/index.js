const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contacts = require("./contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  return contacts;
}

async function getContactById(contactId) {
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[index];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const [contact] = contacts.filter(
    (contact) => contact.id === contactId.toString()
  );
  if (contact) {
    Object.assign(contact, body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
