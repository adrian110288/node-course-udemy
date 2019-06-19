const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.get('/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({
            "error": "Invalid update!"
        })
    }

    try {

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }

        res.send(user)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.post(' /login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        res.send(user)

    } catch (error) {
        res.status(400).send()
    }

})

module.exports = router