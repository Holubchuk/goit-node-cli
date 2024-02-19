import { promises as fs } from "fs";
import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error();
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId || null);
  } catch (error) {
    throw new Error();
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removeContacts = contacts.filter(
      (contact) => contact.id === contactId || null
    );
    await fs.writeFile(contactsPath, JSON.stringify(removeContacts, null, 2));
    return getContactById(contactId);
  } catch (error) {
    throw new Error();
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error();
  }
}

export {listContacts, getContactById, removeContact, addContact};