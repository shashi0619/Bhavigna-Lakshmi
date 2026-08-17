import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { isAdminAuthenticated } from '../../lib/adminAuth';

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');

function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!isAdminAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' });
    return res.status(200).json(readMessages());
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, interest, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const messages = readMessages();
  messages.push({
    id: crypto.randomUUID(),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    phone: phone ? String(phone).slice(0, 40) : '',
    interest: interest ? String(interest).slice(0, 80) : '',
    message: String(message).slice(0, 4000),
    status: 'new',
    createdAt: new Date().toISOString(),
  });
  writeMessages(messages);

  res.status(200).json({ success: true });
}
