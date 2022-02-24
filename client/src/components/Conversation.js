import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../contexts/ConversationProvider";

export default function Conversation() {
  const conversationsCtx = useConversation();

  return (
    <ListGroup variant="flush">
      {conversationsCtx.conversations.map((conversation, i) => (
        <ListGroup.Item
          key={i}
          action
          onClick={() => conversationsCtx.selectConversationIndex(i)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
