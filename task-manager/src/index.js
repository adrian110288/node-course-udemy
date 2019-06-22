const express = require('express')
require('./db/mongoose')
const logger = require('morgan')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

logger.token('body', function (req, res) {
    return JSON.stringify(req.body)
});

app.use(logger(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(express.json())

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})