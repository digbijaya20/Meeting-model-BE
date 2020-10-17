const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()

//Meeting Model
const Meeting = require('../models/Meeting')

//  Get /Meetings

router.get('/', auth, async (req, res) => {
  try {
    const meetings = await Meeting.find({ user: req.user.id })
    res.json(meetings)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})


// Add new meeting

router.post('/',
  [
    auth,
    [
      check('organisedBy', 'Please provide the name').not().isEmpty(),
      check('topic', 'Please provide the topic').not().isEmpty(),
      check('meetingUrl', 'Please provide the meeting Url').not().isEmpty().isURL(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { organisedBy, topic, meetingUrl, password, date } = req.body

    try {
      const newMeeting = new Meeting({
        user: req.user.id,
        organisedBy,
        topic,
        meetingUrl,
        password,
        date
      })
      const meeting = await newMeeting.save()

      res.json(meeting)

    } catch (err) {

      console.error(err.message)
      res.status(500).send('server error')
    }
  })




//  update Meeting



router.put('/:id', auth, async (req, res) => {
    const { organisedBy, topic, meetingUrl, password, date } = req.body

  // build Meeting object 
  const meetingFields = { organisedBy, topic, meetingUrl, password, date };

  try {
    let meeting = await Meeting.findById(req.params.id)
    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' })
    // Make sure user owns the Meeting
    if (meeting.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    meeting = await Meeting.findByIdAndUpdate(req.params.id, { $set: meetingFields }, { new: true })
    res.send(meeting)
  } catch (err) {
    console.errors(err.message)
    res.status(500).send('Server Error')
  }
})



module.exports = router