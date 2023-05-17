const express = require("express")
const path = require("path")
const pool = require("../config")

router = express.Router()

//add comments
router.post("/:id/comments", async function (req, res) {
  console.log(req.params.id);
  const comment = req.body.comment
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [rows1, fields1] = await pool.query(
      'INSERT INTO `commentssss` (`comment`, `book_id`, `comment_by_id`) VALUES (?, ?, 1)',
      [comment, req.params.id]
    )
    await conn.commit()
    return res.json(success)
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err)
  } finally {
    console.log('finally')
    conn.release();
  }
})

router.get("/comments/:id", async function (req, res) {
  const promise1 = pool.query("SELECT * FROM `commentssss` WHERE book_id=?", [req.params.id]);
  Promise.all([promise1])
    .then((results) => {
      const [row, field] = results[0];
      console.log(row)
      res.json({
        comment: row
      });
    })
    .catch((err) => {
      return next(err);
    });
})

//update comments
router.put("/comments/:id", async function (req, res) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const [rows1, fields1] = await pool.query(
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
// router.delete("/comments/:id", async function (req, res) {

// })

exports.router = router;