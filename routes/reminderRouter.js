const express = require('express')
const Reminder = require('../models/reminder')
const reminderRouter = express.Router()


//post
reminderRouter.post('/', async(req, res, next)=>{
    try {
        req.body.userId = req.auth._id
        req.body.username = req.auth.username
        const newReminder = new Reminder(req.body)
        const savedReminder = await newReminder.save()
        return res.status(201).send(savedReminder)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get
reminderRouter.get('/user', async(req, res, next)=>{
    try {
        const foundReminders = await Reminder.find({userId: req.auth._id})
        return res.status(200).send(foundReminders)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//getAll
reminderRouter.get('/', async(req, res, next)=>{
    try {
        const reminders = await Reminder.find()
        return res.status(200).send(reminders)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Edit/update
reminderRouter.put('/:reminderId', async(req, res, next)=>{
    try {
        const foundReminder = req.params.reminderId
        const editedReminder = req.body
        const updatedReminder = await Reminder.findOneAndUpdate(
            {_id: foundReminder, userId: req.auth._id},
            editedReminder,
            {new: true}
        )

        if(!updatedReminder){
            return res.status(404).send("Reminder not found or you are not authorized to edit")
        }
        return res.status(200).send(updatedReminder)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Delete
reminderRouter.delete("/:reminderId", async(req, res, next)=>{
    try {
        const foundReminder = req.params.reminderId
        const deletedReminder = await Reminder.findOneAndDelete({
            _id: foundReminder,
            userId: req.auth._id
        })
        console.log(req.auth._id)
        if(!deletedReminder){
            return res.status(404).send("Journal Entry not found or you are not authorized to delete it")
        }
        return res.status(200).send(`Successfully deleted Journal Entry "${deletedReminder.title}"`)
    } catch (error) {
        res.status(500)
        return next(error)
    } 
})

module.exports = reminderRouter