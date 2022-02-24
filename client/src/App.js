import { Fragment } from "react";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./contexts/ContactProvider";
import { ConversationProvider } from "./contexts/ConversationProvider";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <Fragment>{id ? dashboard : <Login onIdSubmit={setId} />}</Fragment>;
}

export default App;
