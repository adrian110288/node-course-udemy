const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const task = new Task({
    description: 'Learn the Mongoose library',
    completed: false
})

task.save()
    .then((task) => console.log(task))
    .catch((error) => console.log(error))

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },
    password: {
        type: String,
        required: true, 
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase() .includes('password')) {
                throw new Error('Password cannot be password')
            }
        }
    }
})

const me = new User({
    name: 'Adrian',
    email: "ADRIAN110288@GmaiL.com",
    age: 31
})

me.save().then((doc) => console.log(doc))