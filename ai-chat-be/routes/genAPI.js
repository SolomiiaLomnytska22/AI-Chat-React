const express = require('express');
const startNewChat = require('../gemini-setup/gemini-start');
const router = express.Router()

let activeChats = []

router.post('/', async (req, res) => {
    chat = activeChats.find((act_chat) => act_chat.id==req.body.chat)
    if(chat){
        const result = await chat.chat_session.sendMessage(req.body.query);
        console.log(result)
        const response = result.response;
        const text = response.text();
        res.send(text)
    }
})

router.post('/new-chat', async (req, res) => {
    chat_session = startNewChat()
    id = req.body.id
    activeChats.push({chat_session, id})
    res.send('New chat is created!')
})

router.get('/is-active', async (req, res) => {
   return activeChats.find((act_chat) => act_chat.id==req.body.chat) ? true : false
})
module.exports = router;