import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactProvider";
import { useSocket } from "./SocketProvider";

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();

  b.sort();

  return a.every((el, i) => el === b[i]);
};

const ConversationContext = createContext({
  conversations: [],
  selectConversationIndex: () => {},
  selectedConversation: {},
  createConversation: (recipients) => {},
  sendMessage: (recipient, text) => {},
});

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ children, id }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const contactsCtx = useContacts();

  const socket = useSocket();

  const createConversation = (recipients) => {
    setConversations((prevConversation) => [
      ...prevConversation,
      { recipients, messages: [] },
    ]);
  };

  const addMessageToConvversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;

        const newMessage = { sender, text };

        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConvversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConvversation]);

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });

    addMessageToConvversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, i) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contactsCtx.contacts.find(
        (contact) => contact.id === recipient
      );

      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contactsCtx.contacts.find(
        (contact) => contact.id === message.sender
      );

      const name = (contact && contact.name) || message.sender;

      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = i === selectedConversationIndex;

    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
