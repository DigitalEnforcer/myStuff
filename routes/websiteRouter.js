const express = require('express')
const Website = require('../models/website')
const websiteRouter = express.Router()


//post
websiteRouter.post('/', async(req, res, next)=>{
    try {
        req.body.userId = req.auth._id
        req.body.username = req.auth.username
        const newWebsite = new Website(req.body)
        const savedWebsite = await newWebsite.save()
        return res.status(201).send(savedWebsite)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get
websiteRouter.get('/user', async(req, res, next)=>{
    try {
        const foundWebsite = await Website.find({userId: req.auth._id})
        return res.status(200).send(foundWebsite)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//getAll
websiteRouter.get('/', async(req, res, next)=>{
    try {
        const websites = await Website.find()
        return res.status(200).send(websites)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Edit/update
websiteRouter.put('/:websiteId', async(req, res, next)=>{
    try {
        const foundWebsite = req.params.websiteId
        const editedWebsite = req.body
        const updatedWebsite = await Website.findOneAndUpdate(
            {_id: foundWebsite, userId: req.auth._id},
            editedWebsite,
            {new: true}
        )

        if(!updatedWebsite){
            return res.status(404).send("Reminder not found or you are not authorized to edit")
        }
        return res.status(200).send(updatedWebsite)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//Delete
websiteRouter.delete("/:websiteId", async(req, res, next)=>{
    try {
        const foundWebsite = req.params.websiteId
        const deletedWebsite = await Website.findOneAndDelete({
            _id: foundWebsite,
            userId: req.auth._id
        })
        if(!deletedWebsite){
            return res.status(404).send("Web address not found or you are not authorized to delete it")
        }
        return res.status(200).send(`Successfully deleted Web address "${deletedWebsite.title}"`)
    } catch (error) {
        res.status(500)
        return next(error)
    } 
})

module.exports = websiteRouter