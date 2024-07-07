const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Transform the request body to match the Order model schema
    const transformedOrder = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    // Create and save the new order
    const newOrder = new Order(transformedOrder);
    await newOrder.save();

    // Return the created order with status 201 (Created)
    res.status(201).json(newOrder);
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Get a specific order by orderId
exports.getOrder = async (req, res) => {
  try {
    // Find the order by orderId
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      // If order not found, return 404 (Not Found)
      return res.status(404).json({ message: 'Order not found' });
    }
    // Return the found order
    res.json(order);
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// List all orders
exports.listOrders = async (req, res) => {
  try {
    // Find all orders
    const orders = await Order.find();
    // Return the list of orders
    res.json(orders);
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Update an order by orderId
exports.updateOrder = async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Transform the request body to match the Order model schema
    const updatedOrder = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    // Find the order by orderId and update it
    const order = await Order.findOneAndUpdate({ orderId: req.params.orderId }, updatedOrder, { new: true });

    if (!order) {
      // If order not found, return 404 (Not Found)
      return res.status(404).json({ message: 'Order not found' });
    }
    // Return the updated order
    res.json(order);
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Delete an order by orderId
exports.deleteOrder = async (req, res) => {
  try {
    // Find the order by orderId and delete it
    const order = await Order.findOneAndDelete({ orderId: req.params.orderId });

    if (!order) {
      // If order not found, return 404 (Not Found)
      return res.status(404).json({ message: 'Order not found' });
    }
    // Return a success message
    res.json({ message: 'Order deleted' });
  } catch (error) {
    // Return an error message with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};
