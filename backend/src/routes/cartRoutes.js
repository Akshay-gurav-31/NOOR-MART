const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET cart items for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add to cart
router.post('/', async (req, res) => {
  const { productId, quantity, userId } = req.body;
  try {
    const { data: existing, error: findError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select();
      if (error) throw error;
      return res.json(data[0]);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ product_id: productId, quantity, user_id: userId }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE cart item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
