import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, PhonebookContainer, PhonebookTitle } from './App.styled';
import Contacts from './Phonebook/ContactsList/ContactList';
import ContactAddForm  from './Phonebook/ContactAddForm/ContactAddForm';
import Filter from './Phonebook/Filter/Filter';

const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () =>
      parsedContacts ?? [
        { id: 'id-111', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-211', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-311', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-411', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('contacts', contacts);
  }, [contacts]);

  const nameCheker = name => {
    return contacts.find(contact => contact.name === name);
  };

  const onFormSubmit = (name, number) => {
    if (nameCheker(name)) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevState => {
      const contactId = nanoid();
      return [...prevState, { id: contactId, name, number }];
    });
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    )};

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const onFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  return (
    <Container>
      <PhonebookContainer>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactAddForm onSubmit={onFormSubmit}></ContactAddForm>
      </PhonebookContainer>
      <Filter value={filter} onChange={onFilterChange}></Filter>
      <Contacts
        title="Contacts"
        contacts={onFilterContact()}
        onDelete={onDeleteContact}
      ></Contacts>
    </Container>
  );
}
