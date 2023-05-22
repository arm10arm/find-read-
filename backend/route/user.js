const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt')
const Joi = require('joi')
const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.originalname
        );
    },
});
const upload = multer({ storage: storage })
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
router = express.Router();


// Sign Up Section

const checkProfile = async (req, res, next) => {
    const [[user]] = await pool.query("SELECT * FROM user WHERE user_id = ?", [req.params.id])

    if (user.user_id != req.params.id) {
        return res.status(403).send("You don't have permissions to do this action.")
    }
    next()
}


const passwordCheck = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must be at least 8 characters long.')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password is not strong enough.')
    }
    return value
}

const usernameCheck = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT username FROM user WHERE username = ?",
        [value]
    )
    if (value.length < 8) {
        throw new Joi.ValidationError('Username must be at least 8 characters long.')
    }
    if (rows.length >= 8) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email(),
    first_name: Joi.string().required().max(150),
    last_name: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordCheck),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).external(usernameCheck),
    birth_date: Joi.date().required(),
})

router.post("/user/signup", async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err.toString())
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email


    try {
        await conn.query(
            'INSERT INTO user(username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)', [username, password, first_name, last_name, email]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})
//End of Sign Up Section


// Log In Section
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM user WHERE username=?',
            [username]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect username or password')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect username or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE token_user_id=?',
            [user.user_id]
        )
        console.log(user)
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(token_user_id, token) VALUES (?, ?)',
                [user.user_id, token]
            )
        }

        conn.commit()
        res.status(200).json({ 'token': token })
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

// End of Log In Section

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})


router.put('/user/update/:id', isLoggedIn, checkProfile, upload.single('user_pic'), async (req, res, next) => {
    const conn = await pool.getConnection()
    const username = req.body.username
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const user_pic = req.file.filename

    const updateSchema = Joi.object({
        username: Joi.string().required(),
        first_name: Joi.string().required().max(150),
        last_name: Joi.string().required().max(150),
        email: Joi.string().required().email(),
    })
    
    console.log(req.body)

    // Begin transaction
    await conn.beginTransaction();
    try {
        await updateSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    if (user_pic) {
        try {
            const [row] = await pool.query("UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, user_pic = ? WHERE user_id = ?", 
            [username, first_name, last_name, email, user_pic, req.params.id])
            console.log(row)
            await conn.commit()
            res.json({ message: "Update success" })
        } catch (err) {
            console.log(err)
            await conn.rollback();
            res.json(err)
        } finally {
            console.log('finally')
            conn.release();
        }
    }
    else{
        try {
            const [row] = await pool.query("UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ? WHERE user_id = ?", 
            [username, first_name, last_name, email, req.params.id])
            console.log(row)
            await conn.commit()
            res.json({ message: "Update success" })
        } catch (err) {
            console.log(err)
            await conn.rollback();
            res.json(err)
        } finally {
            console.log('finally')
            conn.release();
        }
    }
})

exports.router = router