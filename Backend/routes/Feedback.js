const router = require('express').Router();
const Feedback = require('../models/Feedback');

router.post('/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      feedback: req.body.feedback,
    });
    const customfeedback = await newFeedback.save();
    console.log(customfeedback);
    res.status(200).json(customfeedback);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
// add rating to the driver
router.post('/rating', (req, res) => {
  console.log('it is working');
});
module.exports = router;
