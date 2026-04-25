import Sylvie from 'sylviejs';

const db = new Sylvie('app.db');

const customers = db.addCollection('customers', {
  indices: ['customerId', 'identification', 'customerName'],
  unique: ['customerId'],
});

const notes = db.addCollection('notes', {
  indicies: ['customerId', 'text', 'tags'],
});

export class CustomerDb {
  get count() {
    return customers.count;
  }

  get all() {
    return customers.data;
  }

  create(values) {
    return customers.insert(values);
  }
}

export class NotesDb {
  get count() {
    return notes.count;
  }

  get all() {
    return notes.data;
  }

  create(values) {
    return notes.insert(values);
  }
}
