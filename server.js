const Reservation = require("./models/Reservation")
const User = require("./models/User")
const Catway = require("./models/Catway")

const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const path = require("path")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const catwayRoutes = require("./routes/catwayRoutes")
const reservationRoutes = require("./routes/reservationRoutes")

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/portplaisance")
    .then(() => console.log("Connecté à MongoDB"))
    .catch((err) => console.log("Erreur MongoDB :", err))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "monsecret",
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, "public")))

app.use("/", authRoutes)
app.use("/users", userRoutes)
app.use("/catways", catwayRoutes)
app.use("/catways/:id/reservations", reservationRoutes)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: "monsecret",
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, "public")))

app.use("/", authRoutes)
app.use("/users", userRoutes)
app.use("/catways", catwayRoutes)
app.use("/catways/:id/reservations", reservationRoutes)

app.get("/dashboard", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")
    }

    const reservations = await Reservation.find()

    res.render("dashboard", {
        user: req.session.user,
        reservations
    })
})
app.get("/documentation", (req, res) => {
    res.render("documentation")
})

app.get("/users-view", async (req, res) => {
    const users = await User.find()
    res.render("users", { users })
})

app.get("/catways-view", async (req, res) => {
    const catways = await Catway.find()
    res.render("catways", { catways })
})

app.get("/catways/:id/reservations-view", async (req, res) => {
    const reservations = await Reservation.find({
        catwayNumber: Number(req.params.id)
    })

    res.render("reservation", {
        catwayId: req.params.id,
        reservations
    })
})

app.get("/catways/:id/reservations/new", (req, res) => {
    res.render("newReservation", {
        catwayId: req.params.id
    })
})

app.post("/catways/:id/reservations/new", async (req, res) => {
    const newReservation = new Reservation({
        catwayNumber: Number(req.params.id),
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    await newReservation.save()

    res.redirect(`/catways/${req.params.id}/reservations-view`)
})

app.post("/catways/:id/reservations/:idReservation/delete", async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.idReservation)

    res.redirect(`/catways/${req.params.id}/reservations-view`)
})

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000")
})


