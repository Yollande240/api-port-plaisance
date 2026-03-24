const User = require("../models/User")
exports.showLogin = (req, res) => {
    res.render("index")
}

exports.login = async (req, res) => {
    try {
        console.log("BODY =", req.body)

        const { email, password } = req.body
        console.log("EMAIL =", email)
        console.log("PASSWORD =", password)

        const user = await User.findOne({ email })
        console.log("USER =", user)

        if (!user) {
            return res.status(401).send("Utilisateur introuvable")
        }

        if (user.password !== password) {
            return res.status(401).send("Mot de passe incorrect")
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        req.session.save(() => {
            res.redirect("/dashboard")
        })
    } catch (error) {
        console.log("ERREUR LOGIN =", error)
        res.status(500).send(error.message)
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}