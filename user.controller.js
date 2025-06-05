const User = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select("-password");

    if (!userProfile) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send(userProfile);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({
      message: "Could not update profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
