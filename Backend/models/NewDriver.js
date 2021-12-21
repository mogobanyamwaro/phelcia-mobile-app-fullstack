const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
  {
    driver_name: {
      type: String,
      required: true,
      unique: false,
    },
    plate_number: {
      type: String,
      required: true,
      unique: false,
    },
    cabfare: {
      type: String,
      required: false,
    },
    physical_assault: {
      type: String,
      required: false,
    },
    robbery: {
      type: String,
      required: false,
    },
    sexual_assult: {
      type: String,
      required: false,
    },
    reckless_driving: {
      type: String,
      required: false,
    },
    rude_driver: {
      type: String,
      required: false,
    },

    images: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Driver', DriverSchema);
