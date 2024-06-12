const express = require('express');

const router = express.Router()

//Post Method
router.post('', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.put('/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;