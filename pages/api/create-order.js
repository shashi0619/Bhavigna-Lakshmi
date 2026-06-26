import Razorpay from 'razorpay';
import fs from 'fs';
import path from 'path';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, address } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `blj_${Date.now()}`,
      notes: {
        customer_name: address?.name || '',
        phone: address?.phone || '',
        email: address?.email || '',
        address: `${address?.address1 || ''}, ${address?.address2 || ''}, ${address?.city || ''}, ${address?.state || ''} - ${address?.pincode || ''}`,
      },
    });

    // Save order + full address locally
    const orders = readOrders();
    orders.push({
      orderId: order.id,
      receipt: order.receipt,
      amount: order.amount,
      currency: 'INR',
      status: 'pending',
      createdAt: new Date().toISOString(),
      address: address || {},
      payment: null,
    });
    writeOrders(orders);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
