const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(e)
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({
            "error": "Invalid update!"
        })
    }

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()


        res.send(task)

    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/', auth, async (req, res) => {

    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {

        await req.user.populate({
            path: "tasks",
            match
        }).execPopulate()

        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.get('/:id', auth, async (req, res) => {

    const _id = req.params.id

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router