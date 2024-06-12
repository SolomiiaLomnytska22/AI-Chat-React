const express = require('express');
const startNewChat = require('../gemini-setup/gemini-start');
const router = express.Router()

let chat = startNewChat()

router.post('/', async (req, res) => {
    const result = await chat.sendMessage(req.body.query);
    const response = result.response;
    const text = response.text();
    res.send(text)
})

router.post('/new-chat', async (req, res) => {
    chat = startNewChat()
    res.send('New chat is created!')
})

module.exports = router;