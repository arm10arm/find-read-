const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./route/book')
// const blogRouter = require('./routes/blog')
const commentRouter = require('./route/comment')
const userRouter = require('./route/user')
const memberRouter = require('./route/member')

app.use(indexRouter.router)
app.use(memberRouter.router)
app.use(commentRouter.router)
app.use(userRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
