const express = require("express")
const path = require("path")
const pool = require("../config")
const { isLoggedIn } = require('../middlewares')
const Joi = require('joi')
router = express.Router()

const commentSchema = Joi.object({
  comment: Joi.string().required().max(255)
})

//add comments
router.post("/:id/comments",isLoggedIn,async function (req, res) {
  console.log(req.params.id);

  try {
    await commentSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.toString())
  }

  const comment = req.body.comment
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [rows1, fields1] = await conn.query(
      'INSERT INTO `commentssss` (`comment`, `book_id`, `comment_by_id`) VALUES (?, ?, ?)',
      [comment, req.params.id, req.user.user_id]
    )
    const [data] = await conn.query(
      'select * from commentssss c join `user` u on (c.comment_by_id = u.user_id) where comment_id = ?',
      [rows1.insertId]
    )
    console.log(data[0]);

    res.json(data[0])
    await conn.commit()
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
})

router.get("/comments/:id",async function (req, res) {
  const promise1 = pool.query("SELECT * FROM `commentssss` c join `user` u on (c.comment_by_id = u.user_id) WHERE book_id=?", [req.params.id]);
  Promise.all([promise1])
    .then((results) => {
      const [row, field] = results[0];
      res.json({
        comment: row
      });
    })
    .catch((err) => {
      return next(err);
    });
})

//update comments
router.put("/comments/:id", isLoggedIn,async function (req, res) {

    console.log("hello")
  try {
    await commentSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.toString())
  }

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [rows1, fields1] = await conn.query(
      'update `commentssss` set comment = ? where comment_id = ?',
      [req.body.comment, req.params.id]
    )
    await conn.commit()
    return res.json({"message": "complete"})
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
})

//delete comments
router.delete("/comments/:id", isLoggedIn,async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try{
    const [rows1] = await conn.query("delete from `commentssss` where comment_id = ?", [req.params.id])
    await conn.commit()
    return res.json({"message" : "complete"})
  }catch (err) {
    await conn.rollback();
    return res.status(500).json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
})

exports.router = router;