import React, { useState } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Harry Potter', number: '459-45-56' },
    { id: 'id-2', name: 'Hermione Granger', number: '963-83-21' },
    { id: 'id-3', name: 'Ronald Wesley', number: '645-52-62' },
    { id: 'id-4', name: 'Luna Lovegood', number: '987-98-87' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = todoId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== todoId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 18,

        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={s.titleContacts}>Contacts</h2>
      <div className={s.allContacts}>All contacts: {contacts.length}</div>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
