const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');

const cors = require('cors');
app.use(express.json());
app.use(fileUpload());

const connectDatabase = require('./config/database');
require('dotenv').config({ path: 'config/config.env' });

connectDatabase();

// Setting up clodinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRoute = require('./routes/auth');
const feebackRoute = require('./routes/Feedback');
const driver = require('./routes/Driver');
app.use(cors({ origin: '*' }));

app.use('/api/auth', userRoute);
app.use('/api/v1', feebackRoute);
app.use('/api/v1', driver);

const server = app.listen(process.env.PORT || 4104, () => {
  console.log(
    `Server started on Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('shutting down down due to unhandled Rejection in the database');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
