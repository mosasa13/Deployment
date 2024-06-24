import User from "../../models/User.js";
import mongoose from "mongoose";

const users_get = async (req, res) => {
  res.render("admin/users", {
    title: "Users",
    user: await User.findById(req.params.id),
    users: await User.find(),
  });
};

const user_get = async (req, res) => {
  res.render("admin/userDetails", {
    title: "Users",
    user: await User.findById(req.params.id),
    targetUser: await User.findById(req.params.targetId),
    users: await User.find(),
  });
};

const user_put = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const oldUser = await User.findById(userId)

    // Prevent password updates directly
    if (updates.password) {
      return res.status(400).json({
        errMsg: "Password updates are not allowed through this endpoint",
      });
    }

    if (await User.findOne({ username: updates.username }) && oldUser.username != updates.username) {
      return res.status(400).json({
        errMsg: "Username is taken",
      });
    }

    if (await User.findOne({ email: updates.email }) && oldUser.email != updates.email) {
      return res.status(400).json({
        errMsg: "Email is taken",
      });
    }

    if (await User.findOne({ phone: updates.phone })&& oldUser.phone != updates.phone) {
      return res.status(400).json({
        errMsg: "Phone is taken",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        errMsg: "User not found",
      });
    }

    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      errMsg: error.message,
    });
  }
};

const users_post = async (req, res) => {
  let newUser;
  try {
    const { email, username, password, role, fullName, gender, phone, city } =
      req.body;

    if (await User.findOne({ email }))
      return res.status(409).json({ errMsg: "Email is Taken" });

    if (await User.findOne({ username }))
      return res.status(409).json({ errMsg: "Username is Taken" });

    if (await User.findOne({ phone }))
      return res.status(409).json({ errMsg: "Phone number is Taken" });

    newUser = new User({
      email,
      username,
      password,
      role,
      fullName,
      gender,
      phone,
      city,
    }).save();
  } catch (err) {
    return res.status(409).json({ errMsg: err });
  }

  return res.status(201).json({ user: newUser });
};

const users_delete = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send(`No user with id: ${userId}`);

  await User.findByIdAndDelete(userId);

  res.json({ message: "User deleted successfully" });
};

export default { users_get, user_get, user_put, users_post, users_delete };
