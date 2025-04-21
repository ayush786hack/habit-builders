require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer'); // For email verification
const twilio = require('twilio'); // For phone number verification
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ─── MONGODB CONNECTION ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ─── USER MODEL ───────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  storedOtp: { type: String } // To store OTP temporarily
});

const User = mongoose.model('User', userSchema);

// ─── TRANSPORTERS FOR EMAIL AND PHONE VERIFICATION ───────────────────────────
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS   // Replace with your email password
  }
});

const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// ─── HELPER FUNCTIONS FOR SENDING EMAIL AND OTP ──────────────────────────────
const sendVerificationEmail = (email, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred: ' + error);
    } else {
      console.log('Verification email sent: ' + info.response);
    }
  });
};

const sendOtpMessage = (phoneNumber, otp) => {
  twilioClient.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE, // Your Twilio phone number
      to: phoneNumber
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error('Error occurred:', error));
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// User registration route
app.post('/api/register', async (req, res) => {
  const { email, phone, password } = req.body;

  // Check if the email or phone already exists in the database
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'Email already exists' });

  // Generate OTP and send to phone/email
  const otp = generateOtp();
  sendOtpMessage(phone, otp);  // For phone number verification
  // Or use sendVerificationEmail(email, verificationLink) for email

  // Hash the password before storing it
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    // Save user to the database with "isVerified: false"
    const newUser = new User({
      email,
      phone,
      password: hashedPassword,  // Store the hashed password
      isVerified: false,  // Default to false
      storedOtp: otp      // Store OTP temporarily
    });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully. Please verify your phone/email.' });
  });
});

// OTP verification route (for phone number verification)
app.post('/api/verify', async (req, res) => {
  const { userId, otpEntered } = req.body;  // User ID and OTP entered by the user

  // Retrieve the user from the database
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ error: 'User not found' });

  // Compare the OTPs (you can store OTPs temporarily in the DB or use in-memory cache)
  if (otpEntered === user.storedOtp) {
    // Mark the user as verified
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: 'Phone/email verified successfully!' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const twilioSID = process.env.TWILIO_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;


// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
