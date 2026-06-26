import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verify signature to prevent fake success calls
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Mark order as paid
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.orderId === razorpay_order_id);
  if (idx !== -1) {
    orders[idx].status = 'paid';
    orders[idx].payment = {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      paidAt: new Date().toISOString(),
    };
    writeOrders(orders);
  }

  res.status(200).json({ success: true });
}
