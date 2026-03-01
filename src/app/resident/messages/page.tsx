'use client';

import { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { messages } from '@/data/messages';
import { currentResident } from '@/data/residents';

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('');

  const conversation = messages.filter((m) => m.conversationId === 'conv-1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <header
        style={{
          padding: '48px 20px 16px',
          background: '#ffffff',
          borderBottom: '1px solid #f1f5f9',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6, #0f766e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            SM
          </div>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Sarah Mitchell</h1>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Property Manager</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        role="log"
        aria-label="Message history"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {conversation.map((msg) => {
          const isMe = msg.senderId === currentResident.id;
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isMe ? '#0f766e' : '#ffffff',
                  color: isMe ? 'white' : '#1e293b',
                  border: isMe ? 'none' : '1px solid #f1f5f9',
                  boxShadow: isMe ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <p style={{ fontSize: 14, margin: '0 0 4px', lineHeight: 1.5 }}>{msg.content}</p>
                <span
                  style={{
                    fontSize: 10,
                    color: isMe ? 'rgba(255,255,255,0.7)' : '#64748b',
                    display: 'block',
                    textAlign: 'right',
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 20px calc(80px + env(safe-area-inset-bottom, 8px))',
          background: '#ffffff',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <label htmlFor="message-input" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          Type a message
        </label>
        <Input
          id="message-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ borderRadius: 12, flex: 1 }}
          size="large"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          size="large"
          aria-label="Send message"
          style={{ borderRadius: 12 }}
          onClick={() => setNewMessage('')}
        />
      </div>
    </div>
  );
}
