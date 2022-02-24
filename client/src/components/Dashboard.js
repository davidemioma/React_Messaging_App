import React from "react";
import { useConversation } from "../contexts/ConversationProvider";
import OpenConversations from "./OpenConversations";
import Sidebar from "./Sidebar";

export default function Dashboard({ id }) {
  const conversationsCtx = useConversation();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {conversationsCtx.selectedConversation && <OpenConversations />}
    </div>
  );
}
