const express = require('express');
const User = require("../models/user");
const router = express.Router()

//Post Method
router.post('', async (req, res) => {
    try {
        const newUser = new User({ ...req.body });
        const createdUser = await newUser.save();
        return res.status(200).json(createdUser);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Get Method
router.get('', async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
   
})

//Get by ID Method
router.get('/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Update by ID Method
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await User.updateOne({ _id: id }, req.body);
        const updatedUser = await User.findById(id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
  
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

module.exports = router;