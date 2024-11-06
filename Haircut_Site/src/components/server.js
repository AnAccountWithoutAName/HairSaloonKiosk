const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hairSalonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define a Cart schema and model
const cartSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// Route to handle cart data submission
app.post('/api/cart', async (req, res) => {
  const { items, total } = req.body;

  try {
    const newCart = new Cart({ items, total });
    await newCart.save();
    res.status(200).json({ message: "Cart saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving cart", error });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
