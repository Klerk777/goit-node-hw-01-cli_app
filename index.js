const contacts = require('./contacts');
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContacts = await contacts.listContacts();
      return console.log('All contacts: ', listContacts);

    case 'get':
      const oneContact = await contacts.getContactById(id);
      return console.log(`Contact with id ${id}:`, oneContact);

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      return console.log('Added new contact: ', newContact);

    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      return console.log('Deleted contact: ', deletedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
