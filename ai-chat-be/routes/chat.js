const express = require('express');
const Chat = require("../models/chat");
const router = express.Router()

//Post Method
router.post('', async (req, res) => {
    try {
        const newChat = new Chat({ ...req.body });
        const createdChat = await newChat.save();
        return res.status(200).json(createdChat);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Get Method
router.get('', async (req, res) => {
    try {
        const allChats = await Chat.find();
        return res.status(200).json(allChats);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
   
})

//Get by ID Method
router.get('/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findById(id);
        return res.status(200).json(chat);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

//Update by ID Method
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Chat.updateOne({ _id: id }, req.body);
        const updatedChat = await Chat.findById(id);
        return res.status(200).json(updatedChat);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
  
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);
        return res.status(200).json(deletedChat);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

module.exports = router;