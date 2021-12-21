const router = require('express').Router();
const Driver = require('../models/NewDriver');
const cloudinary = require('cloudinary');

// add new driver
router.post('/driver', async (req, res) => {
  try {
    if (req.body.images) {
      let images = [];
      if (typeof req.body.images === 'string') {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
      let imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'driver',
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLinks;
    }
    req.body.plate_number = req.body.plate_number.toUpperCase();

    const newDriver = await Driver.create(req.body);
    console.log(newDriver);
    res.status(201).json({
      success: true,
      newDriver,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
// add rating to the driver
router.post('/rating/id', async (req, res) => {
  try {
    const driver = await Driver.find({ plate_number: req.body.plate_number });
    //   i console log to see if i can get the id
    driver.ratings =
      driver.reviews.reduce((acc, item) => item.rating + acc, 0) /
      driver.reviews.length;

    if (!driver) {
      return res.status(404).json('no driver found');
    }
    const newDriver = await Driver.findByIdAndUpdate(
      driver._id,
      { rating: req.body.ratings },
      {
        new: false,
        runValidators: true,
        useFindAndMOdify: false,
      }
    );
    res.status(200).json({
      success: true,
      newDriver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('server error');
  }
});
// get the driver
router.post('/driver/plate', async (req, res) => {
  try {
    let driver = await Driver.find({
      plate_number: req.body.plate_number.toUpperCase(),
    });
    if (!driver) {
      return res.status(404).json('no driver found');
    }
    const Custom_plate_number = driver[0].plate_number;
    const Custom_driver_name = driver[0].driver_name;
    res.status(200).json({
      success: true,
      Custom_driver_name,
      Custom_plate_number,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
