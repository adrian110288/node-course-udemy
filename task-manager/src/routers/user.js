const express = require('express')
const multer = require('multer')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({
            "error": "Invalid update!"
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        res.send()

    } catch (error) {
        res.status(500).send(error)
    }

})

const upload = multer({

    // Removing dest in order to get access to the saved file in req.
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be a jpg, jpeg or png!'))
        }

        cb(undefined, true)
    }
})

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()

}, (error, req, res, next) => res.status(400).send({
    error: error.message
}))

router.delete('/me/avatar', auth, async (req, res) => {

    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send()
    }

})

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({
            user,
            token
        })

    } catch (error) {
        res.status(400).send()
    }

})

router.post('/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router