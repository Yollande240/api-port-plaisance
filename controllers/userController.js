const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateUserByEmail = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteUserByEmail = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email })
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" })
    }
    res.json({ message: "Utilisateur supprimé" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}