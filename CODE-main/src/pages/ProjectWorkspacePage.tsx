import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const ProjectWorkspacePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, getProjectById, getMessagesByProjectId, addMessage } = useApp();

  const project = getProjectById(projectId || '');
  const [chatMode, setChatMode] = useState<'group' | string>('group');
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMode, newMessageText]);

  if (!project) return <div style={{ padding: '2rem' }}>Project not found.</div>;

  const allMessages = getMessagesByProjectId(project.id);

  const filteredMessages =
    chatMode === 'group'
      ? allMessages.filter((msg) => !msg.privateChatWith)
      : allMessages.filter(
          (msg) =>
            (msg.sender === user?.name && msg.privateChatWith === chatMode) ||
            (msg.sender === chatMode && msg.privateChatWith === user?.name)
        );

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    addMessage({
      sender: user?.name || 'Unknown',
      message: newMessageText.trim(),
      projectId: project.id,
      privateChatWith: chatMode === 'group' ? undefined : chatMode,
    });
    setNewMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#FFF',
        color: '#111',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 320,
          backgroundColor: '#111',
          color: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <h2 style={{ marginBottom: 24, fontWeight: 'bold', fontSize: 22 }}>
          Chats
        </h2>
        <button
          onClick={() => setChatMode('group')}
          style={{
            padding: '12px 16px',
            textAlign: 'left',
            marginBottom: 16,
            backgroundColor: chatMode === 'group' ? '#0b81ff' : 'transparent',
            color: chatMode === 'group' ? '#FFF' : '#CCC',
            fontWeight: chatMode === 'group' ? '600' : 'normal',
            border: 'none',
            borderRadius: 20,
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s',
          }}
        >
          {project.title} (Group Chat)
        </button>
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: 12, marginBottom: 16 }}>
          Individual Chats
        </h3>
        <div style={{ flexGrow: 1 }}>
          {project.members
            .filter((m) => m.name !== user?.name)
            .map((member) => {
              const selected = chatMode === member.name;
              return (
                <button
                  key={member.id}
                  onClick={() => setChatMode(member.name)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 14px',
                    textAlign: 'left',
                    marginBottom: 8,
                    backgroundColor: selected ? '#0b81ff' : 'transparent',
                    color: selected ? '#FFF' : '#BBB',
                    fontWeight: selected ? '600' : 'normal',
                    border: 'none',
                    borderRadius: 20,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background-color 0.3s',
                  }}
                >
                  {member.name}
                </button>
              );
            })}
        </div>
      </aside>
      {/* Chat Area */}
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          boxSizing: 'border-box',
        }}
      >
        <header
          style={{
            borderBottom: '1px solid #DDD',
            paddingBottom: 12,
            marginBottom: 20,
            fontWeight: '600',
            fontSize: 20,
          }}
        >
          {chatMode === 'group' ? `${project.title} - Group Chat` : `Chat with ${chatMode}`}
        </header>
        <section
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: 16,
            marginBottom: 20,
            backgroundColor: '#f8f9fa',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {filteredMessages.length === 0 && (
            <p style={{ color: '#666', padding: 24, textAlign: 'center' }}>
              No messages yet. Start the conversation!
            </p>
          )}
          {filteredMessages.map((msg) => {
            const isSent = msg.sender === user?.name;
            const msgDate = new Date(msg.timestamp);
            const dayName = msgDate.toLocaleDateString('en-US', { weekday: 'long' });
            const timeStr = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isSent ? 'flex-end' : 'flex-start',
                  backgroundColor: isSent ? '#0b81ff' : '#FFFFFF',
                  color: isSent ? '#FFF' : '#000',
                  padding: '10px 16px',
                  margin: '4px 0',
                  maxWidth: '60%',
                  borderRadius: 20,
                  wordWrap: 'break-word',
                  boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
                  userSelect: 'text',
                  whiteSpace: 'pre-wrap',
                  position: 'relative',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: 4, fontSize: 14 }}>
                  {isSent ? 'You' : msg.sender}
                </div>
                <div>{msg.message}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 6, textAlign: 'right' }}>
                  {dayName}, {timeStr}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <input
            type="text"
            placeholder="Type a message"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              flexGrow: 1,
              padding: 14,
              borderRadius: 40,
              border: '1px solid #CCC',
              outline: 'none',
              fontSize: 16,
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#0b81ff',
              border: 'none',
              borderRadius: 40,
              width: 44,
              height: 44,
              color: '#FFF',
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              outline: 'none',
            }}
            aria-label="Send message"
          >
            &gt;
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProjectWorkspacePage;
