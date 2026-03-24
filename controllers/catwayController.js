const Catway = require("../models/Catway")

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find()
    res.json(catways)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id })

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" })
    }

    res.json(catway)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createCatway = async (req, res) => {
  try {
    const newCatway = new Catway(req.body)
    const savedCatway = await newCatway.save()
    res.status(201).json(savedCatway)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      req.body,
      { new: true }
    )

    if (!updatedCatway) {
      return res.status(404).json({ message: "Catway introuvable" })
    }

    res.json(updatedCatway)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findOneAndDelete({
      catwayNumber: req.params.id
    })

    if (!deletedCatway) {
      return res.status(404).json({ message: "Catway introuvable" })
    }

    res.json({ message: "Catway supprimé" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}