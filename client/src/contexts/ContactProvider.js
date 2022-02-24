import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext({
  contacts: [],
  createContact: (id, name) => {},
});

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id, name) => {
    setContacts((prevContact) => {
      return [...prevContact, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
