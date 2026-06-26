import fs from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    // newest first
    res.status(200).json(orders.reverse());
  } catch {
    res.status(200).json([]);
  }
}
