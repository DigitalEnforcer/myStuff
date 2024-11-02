const express = require('express')
const Journal = require('../models/journal')
const journalRouter = express.Router()

//post
journalRouter.post('/', async(req, res, next)=>{
    try {
        req.body.userId = req.auth._id
        req.body.username = req.auth.username
        const newJournal = new Journal(req.body)
        const savedJournal = await newJournal.save()
        return res.status(201).send(savedJournal)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get
journalRouter.get('/user', async(req, res, next)=>{
    try {
        const foundJournals = await Journal.find({userId: req.auth._id})
        return res.status(200).send(foundJournals)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//getAll
journalRouter.get('/', async(req, res, next)=>{
    try {
        const journals = await Journal.find()
        return res.status(200).send(journals)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Edit/update
journalRouter.put('/:journalId', async(req, res, next)=>{
    try {
        const foundJournal = req.params.journalId
        const editedJournal = req.body
        const updatedJournal = await Journal.findOneAndUpdate(
            {_id: foundJournal, userId: req.auth._id},
            editedJournal,
            {new: true}
        )

        if(!updatedJournal){
            return res.status(404).send("Journal entry not found or you are not authorized to edit")
        }
        return res.status(200).send(updatedJournal)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Delete
journalRouter.delete("/:journalId", async(req, res, next)=>{
    try {
        const foundJournal = req.params.journalId
        const deletedJournal = await Journal.findOneAndDelete({
            _id: foundJournal,
            userId: req.auth._id
        })
        if(!deletedJournal){
            return res.status(404).send("Journal Entry not found or you are not authorized to delete it")
        }
        return res.status(200).send(`Successfully deleted Journal Entry "${deletedJournal.title}"`)
    } catch (error) {
        res.status(500)
        return next(error)
    } 
})

module.exports = journalRouter