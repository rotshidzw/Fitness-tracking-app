const User = require('../models/user.model');

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
