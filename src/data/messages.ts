import { Message } from '@/types';

export const messages: Message[] = [
  // Conversation between Ahmad Razali and management
  { id: 'msg-1', conversationId: 'conv-1', senderId: 'r-1', senderName: 'Ahmad Razali', senderRole: 'resident', content: 'Hi, I wanted to follow up on the flickering light issue in my unit. Is the electrician scheduled?', timestamp: '2026-02-27T08:30:00Z' },
  { id: 'msg-2', conversationId: 'conv-1', senderId: 'manager', senderName: 'Amirah Zainal', senderRole: 'manager', content: 'Good morning Ahmad! Yes, Encik Razak (our electrician) is already working on it. He visited yesterday and identified the issue. He needs to order a replacement part.', timestamp: '2026-02-27T09:15:00Z' },
  { id: 'msg-3', conversationId: 'conv-1', senderId: 'r-1', senderName: 'Ahmad Razali', senderRole: 'resident', content: 'Great, thanks for the update! How long do you think the repair will take?', timestamp: '2026-02-27T09:20:00Z' },
  { id: 'msg-4', conversationId: 'conv-1', senderId: 'manager', senderName: 'Amirah Zainal', senderRole: 'manager', content: 'The part should arrive by Friday. Encik Razak will come Saturday morning to complete the repair. We\'ll keep you posted!', timestamp: '2026-02-27T09:45:00Z' },
  { id: 'msg-5', conversationId: 'conv-1', senderId: 'r-1', senderName: 'Ahmad Razali', senderRole: 'resident', content: 'Perfect, Saturday works well for me. Thanks!', timestamp: '2026-02-27T10:00:00Z' },

  // Conversation between Nurul Aisyah and management
  { id: 'msg-6', conversationId: 'conv-2', senderId: 'r-4', senderName: 'Nurul Aisyah', senderRole: 'resident', content: 'Hello, my front door lock is getting worse. The key gets completely stuck now. Can someone come urgently?', timestamp: '2026-02-27T11:00:00Z' },
  { id: 'msg-7', conversationId: 'conv-2', senderId: 'manager', senderName: 'Amirah Zainal', senderRole: 'manager', content: 'Hi Nurul, I\'ve marked this as urgent and assigned Encik Halim (locksmith). He\'ll be there within 2 hours. Please stay in the unit if possible.', timestamp: '2026-02-27T11:15:00Z' },
  { id: 'msg-8', conversationId: 'conv-2', senderId: 'r-4', senderName: 'Nurul Aisyah', senderRole: 'resident', content: 'Thank you so much! I\'ll be here all afternoon.', timestamp: '2026-02-27T11:20:00Z' },

  // Conversation between Wong Kai Wen and management
  { id: 'msg-9', conversationId: 'conv-3', senderId: 'r-5', senderName: 'Wong Kai Wen', senderRole: 'resident', content: 'The bathroom leak is getting worse. Water is now dripping into the hallway. This is urgent!', timestamp: '2026-02-28T08:00:00Z' },
  { id: 'msg-10', conversationId: 'conv-3', senderId: 'manager', senderName: 'Amirah Zainal', senderRole: 'manager', content: 'Kai Wen, thank you for reporting this. I\'m dispatching our emergency plumber right now. Please place towels around the leak area to minimise water damage. Someone will be there within 1 hour.', timestamp: '2026-02-28T08:10:00Z' },
];
