const express = require("express")
const path = require("path")
const pool = require("../config")
const { isLoggedIn } = require('../middlewares')
const Joi = require('joi')
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

const bookcheckSchema = Joi.object({
  name: Joi.string().required().max(150),
  type: Joi.string().required(),
  publisher: Joi.string().required().max(80),
  author: Joi.string().required().max(80),
  content: Joi.string().required().max(255)
})

//add books
router.post("/books", isLoggedIn,upload.single('book_image'), async function (req, res) {

  try {
    await bookcheckSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.toString())
  }

  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return res.json(error)
  }
  const book_name = req.body.name;
  const book_type = req.body.type;
  const author = req.body.author;
  const content = req.body.content;
  const publisher = req.body.publisher;
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results = await pool.query(
      "INSERT INTO  books(book_name, author, book_type, publisher, book_img, contents,add_by_id) VALUES(?, ?, ?, ?, ?, ?,1);",
      [book_name, author, book_type, publisher, file.path.substr(6), content]
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

//show books
router.get("/books",async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    const [row] = await conn.query(
      "select * from books",
    )
    console.log(row)
    await conn.commit()
    res.json({ books: row })
  } catch (err) {
    console.log(err)
    await conn.rollback();
    res.json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
}
)

//show book
router.get("/book/:id", async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    const [row] = await conn.query(
      "select * from books where book_id = ?", [req.params.id]
    )
    const [row1] = await conn.query(
      "SELECT * FROM `like` WHERE book_id=?", [req.params.id]
    )
    await conn.commit()
    // console.log(row1)
    res.json({ book: row, like: row1 })
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
router.put("/books/:id", isLoggedIn, async function (req, res) {

  const book_name = req.body.book_name;
  const book_type = req.body.book_type;
  const author = req.body.book_author;
  const content = req.body.content;
  const publisher = req.body.publisher;
  console.log(req.body)
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try{
      const [rows] = await conn.query("update `books` set book_name = ?, book_type = ?, author = ?, contents = ?, publisher = ? where book_id = ?", [book_name, book_type, author,content,publisher, req.params.id])
    await conn.commit()
    console.log(rows)
    res.json({"message": "complete"})
  } catch (err) {
    console.log(err)
    await conn.rollback();
    res.json(err)
  } finally {
    console.log('a finally')
    conn.release();
  }
})

//delete book
router.delete("/books/:id",isLoggedIn, async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try{
    const[rows1] = await conn.query("delete from `books` where book_id = ?", [req.params.id])
    await conn.commit()
    res.json({"message": "complete"})
  } catch (err) {
    console.log(err)
    await conn.rollback();
    res.json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
})


//create book in wishlist
router.post("/wishlist", isLoggedIn,async function (req, res) {
  const see = req.body.sent
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [rows, fields] = await conn.query("select * from books where book_id = ?", see.book_id)
    const [rows2, fields2] = await conn.query("insert into `wishlist`(wishlist_by_id, book_name, book_type, book_img,book_id, author, publisher) values(?,?,?,?,?,?,?)", [req.user.user_id,rows[0].book_name, rows[0].book_type, rows[0].book_img, see.book_id, rows[0].author, rows[0].publisher])
    console.log(rows2)
    await conn.commit()
  } catch (err) {
    console.log(err)
    await conn.rollback();
  } finally {
    console.log('finally')
    conn.release();
  }

})

router.get("/wishlist", isLoggedIn,async function (req, res) {

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try{
    const [rows1] = await pool.query("select * from `wishlist` where wishlist_by_id = ?", [req.user.user_id])
    await conn.commit()
    console.log(rows1)
    res.json({wish:rows1})
  }catch (err) {
    console.log(err)
    await conn.rollback();
  }
  finally {
    console.log('finally')
    conn.release();
  }


})



//create like
router.post("/like/:id", isLoggedIn,async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [create] = await conn.query("insert into `like`(like_by_id,book_id, `like`) values(?,?,1)", [req.user.user_id, req.params.id])
    console.log(create)
    await conn.commit()
    res.json({
      message: "complete"
    });
  }
  catch (err) {
    console.log(err)
    await conn.rollback();
  }
  finally {
    console.log('finally')
    conn.release();
  }
})
exports.router = router;