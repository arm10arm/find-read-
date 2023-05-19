const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')
router = express.Router();

router.get("/members", async function (req, res) {
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
        const [row] = await pool.query("SELECT * FROM user WHERE ban = 0 AND role = 'user'")
        console.log(row)
        await conn.commit()
        res.json({ user: row })
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

router.put("")
exports.router = router;