const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')
router = express.Router();


// Get Unbanned User Info
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

// Get Banned User Info
router.get("/banmembers", async function (req, res) {
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
        const [row] = await pool.query("SELECT * FROM user WHERE ban = 1 AND role = 'user'")
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

// Ban User
router.put("/members/:id", async function (req, res) {
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    try {
        const [row] = await pool.query("UPDATE user SET ban = 1 WHERE user_id = ?", [req.params.id])
        console.log(row)
        await conn.commit()
        res.json({ message: "Ban success" })
    } catch (err) {
        console.log(err)
        await conn.rollback();
        res.json(err)
    } finally {
        console.log('finally')
        conn.release();
    }
})

// Unban User
router.put("/banmembers/:id", async function (req, res) {
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    try {
        const [row] = await pool.query("UPDATE user SET ban = 0 WHERE user_id = ?", [req.params.id])
        console.log(row)
        await conn.commit()
        res.json({ message: "Unban success" })
    } catch (err) {
        console.log(err)
        await conn.rollback();
        res.json(err)
    } finally {
        console.log('finally')
        conn.release();
    }
})

exports.router = router;