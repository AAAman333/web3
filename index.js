const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Flower = require('./models/Flower');
const Order = require('./models/Order');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://moldiryergesh:Vekz2006@cluster0.ybkq4mp.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error', err));

app.post('/flowers', async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: 'Error: Name and Price are required fields.' });
  }
  try {
    const doc = new Flower({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
    });
    const flower = await doc.save();
    res.status(201).json(flower);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create flower' });
  }
});

app.get('/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 });
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get flowers' });
  }
});

app.get('/flowers/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.json(flower);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get flower' });
  }
});

app.delete('/flowers/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete flower' });
  }
});

app.put('/flowers/:id', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: 'Error: Request body cannot be empty.' });
  }
  try {
    await Flower.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update flower' });
  }
});

app.post('/orders', async (req, res) => {
  if (!req.body.customerName || !req.body.phone || !req.body.address) {
    return res.status(400).json({ message: 'Error: Customer Name, Phone, and Address are required.' });
  }
  if (!req.body.items || req.body.items.length === 0) {
    return res.status(400).json({ message: 'Error: Order must contain at least one item.' });
  }
  try {
    const doc = new Order({
      customerName: req.body.customerName,
      phone: req.body.phone,
      address: req.body.address,
      totalPrice: req.body.totalPrice,
      items: req.body.items,
    });
    const order = await doc.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get orders' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

app.put('/orders/:id', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Error: Request body cannot be empty.' });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        customerName: req.body.customerName,
        phone: req.body.phone,
        address: req.body.address,
        totalPrice: req.body.totalPrice
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order' });
  }
});
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${PORT}`);
});