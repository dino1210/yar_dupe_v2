const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Users List")
})

router.get("/new", (req, res) => {
    res.send("Users New Form")
})


router.post("/", (req, res) => {
    res.send("Create User")
})

router
.route("/:id")
.get((req, res) => {
    req.params.id
    res.send(`Get Users ID ${req.params.id}`)
})
.put((req, res) => {
    req.params.id
    res.send(`Update Users ID ${req.params.id}`)
})
.delete((req, res) => {
    req.params.id
    res.send(`Delete Users ID ${req.params.id}`)
})

const users = [{ name: "Test" }, { name: "Test1" }]

router.param("id", (req, res, next, id) => {
    req.user = users[id ]
    next()
})

module.exports = router