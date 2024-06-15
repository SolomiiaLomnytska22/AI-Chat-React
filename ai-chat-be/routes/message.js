const express = require('express');
const Message = require("../models/message");
const router = express.Router()

//Post Method
router.post('', async (req, res) => {
    try {
        const newMessage = new Message({ ...req.body });
        const createdMessage = await newMessage.save();
        return res.status(200).json(createdMessage);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Get Method
router.get('', async (req, res) => {
    try {
        const allMessages = await Message.find();
        return res.status(200).json(allMessages);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
   
})

//Get by ID Method
router.get('/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        return res.status(200).json(message);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Update by ID Method
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Message.updateOne({ _id: id }, req.body);
        const updatedMessage = await Message.findById(id);
        return res.status(200).json(updatedMessage);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
  
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        return res.status(200).json(deletedMessage);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

module.exports = router;