const express = require("express")
const Goal = require('../models/goal')
const goalRouter = express.Router()

//post
goalRouter.post('/', async (req, res, next) =>{
    try {
        req.body.userId = req.auth._id // id of user logged in
        req.body.username = req.auth.username 
        const newGoal = new Goal(req.body)
        const savedGoal = await newGoal.save()
        return res.status(201).send(savedGoal)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//get
goalRouter.get('/user', async (req, res, next) =>{
    try {
        const foundGoals = await Goal.find({userId: req.auth._id})
        return res.status(200).send(foundGoals)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//getAll
goalRouter.get('/', async (req, res, next)=>{
    try {
        const goals = await Goal.find()
        return res.status(200).send(goals)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})



// Edit/Update
goalRouter.put('/:goalId', async(req, res, next)=>{
    try {
        const foundGoal = req.params.goalId
        const editedGoal = req.body
        const updatedGoal = await Goal.findOneAndUpdate(
            {_id: foundGoal, userId: req.auth._id},
            editedGoal,
            {new: true}
        )

        if(!updatedGoal){
            return res.status(404).send("Goal not found or you are not authorized to edit")
        }
        return res.status(200).send(updatedGoal)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

// Delete
goalRouter.delete('/:goalId', async(req, res, next)=>{
    try {
        const foundGoal = req.params.goalId
        const deletedGoal = await Goal.findOneAndDelete({
            _id: foundGoal,
            userId: req.auth._id
        })
        if(!deletedGoal){
            return res.status(404).send("Goal not found or you are not authrorized to delete it")
        }
        return res.status(200).send(`Successfully deleted Goal "${deletedGoal.title}"`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

goalRouter.put('/upvotes/:goalId', async(req, res, next)=>{
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            {
                $addToSet: {upvotes: req.auth._id},
                $pull: {downvotes: req.auth._id}
            },
            {new: true}
        )
        return res.status(201).send(updatedGoal)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

goalRouter.put('/downvotes/:goalId', async(req, res, next)=>{
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            {
                $addToSet: {downvotes: req.auth._id},
                $pull: {upvotes: req.auth._id}
            },
            {new: true}
        )
        return res.status(201).send(updatedGoal)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = goalRouter