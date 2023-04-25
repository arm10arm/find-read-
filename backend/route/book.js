const express = require("express")
const path = require("path")
const pool = require("../config")

router = express.Router()

// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

//add books
router.post("/books",upload.single('book_image'),async function (req, res) {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return res.json(error)
    }
    const book_name = req.body.book_name;
    const book_type = req.body.book_type;
    const author = req.body.book_author;
    const content = req.body.content;
    const publisher = req.body.publisher;
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
        let results = await conn.query(
          "INSERT INTO  books(book_name, author, book_type, publisher, book_img, content) VALUES(?, ?, ?, ?, ?,?);",
          [book_name,author,book_type,publisher,file.path.substr(6),content]
        )
        await conn.commit()
        res.json("success!")
      } catch (err) {
        console.log(err)
        await conn.rollback();
        res.json(err)
      } finally {
        console.log('finally')
        conn.release();
      }
  })

//update book
router.get("/books/:id", async function (req, res) {

})

router.put("/books/:id", async function (req, res) {

})

//delete book
router.delete("/books/:id", async function (req, res) {

})

exports.router = router;