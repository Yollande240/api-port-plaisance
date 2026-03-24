const Reservation = require("../models/Reservation")
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id })
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    })

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" })
    }

    res.json(reservation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    })

    const savedReservation = await newReservation.save()
    res.status(201).json(savedReservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findOneAndUpdate(
      {
        _id: req.params.idReservation,
        catwayNumber: req.params.id
      },
      req.body,
      { new: true }
    )

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation introuvable" })
    }

    res.json(updatedReservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    })

    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation introuvable" })
    }

    res.json({ message: "Réservation supprimée" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}