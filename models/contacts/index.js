const Contact = require("./contact");

async function listContacts(id) {
  return Contact.find({ owner: id }, "_id name email phone favorite");
}

async function getContactById(contactId) {
  const contact = Contact.findById(contactId, "_id name email phone favorite");
  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(data) {
  const newContact = await Contact.create(data);
  return newContact;
}

async function updateContact(contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contact;
}

async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contact;
}
async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
