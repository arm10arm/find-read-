const express = require("express")
const path = require("path")
const pool = require("../config")

router = express.Router()

//add comments
router.post("/comments/:id",upload.single('book_image'),async function (req, res) {

})

//update comments
router.get("/comments/:id", async function (req, res) {

})

router.put("/comments/:id", async function (req, res) {

})

//delete comments
router.delete("/comments/:id", async function (req, res) {

})

exports.router = router;