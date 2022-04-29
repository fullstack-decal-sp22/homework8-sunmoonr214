const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/User');

router.get('/list', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error in Fetching shopping list' });
    }
  });

router.post('/add', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.shoppinglist.push(req.body.item);
        await user.save();
        res.send(user.shoppinglist);
    } catch(e) {
        res.send({message: "Error adding to shopping list"});
    }
});

router.delete('/delete', auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id);
        user.shoppinglist = user.shoppinglist.filter(
            element => element !== req.body.item
        );
        await user.save();
        res.send(user.shoppinglist);
    } catch(e) {
        res.send({message: "Error deleting from shopping list"});
    }
})

module.exports = router;