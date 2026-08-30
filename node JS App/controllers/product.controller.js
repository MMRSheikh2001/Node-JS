
const Product = require('../models/product.model');

// CREATE
exports.create = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const product = await Product.create({ name, description, price, quantity });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


// READ - all
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// READ - one by id
exports.findOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: `Product with id ${req.params.id} not found.` });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};


// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Product.update(req.body, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }

    const updatedProduct = await Product.findByPk(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Product.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }

    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



