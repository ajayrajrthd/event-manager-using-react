const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON bodies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require('express-session');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser for parsing JSON bodies

const url = 'mongodb+srv://disha:dishadisha@cluster0.0fuuedz.mongodb.net/Event';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Generating tokens and creating sessions
const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Register Schema
const regSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  club: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Reg = mongoose.model('users', regSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, club, password, confirm_password } = req.body;
  
  if (!name || !email || !club || !password || !confirm_password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await Reg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newReg = new Reg({
      name,
      email,
      club,
      password: hashedPassword
    });

    await newReg.save();
    return res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

//Login
app.post('/login',async(req,res)=>{
  const{email,password}=req.body;
  try{
    const reg=await Reg.findOne({email});
    if (!reg){
      return res.status(400).json({ message: 'invalid email or password' });
      console.log('invalid email')
    }
const isPasswordValid = await bcrypt.compare(password, reg.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.session.reg={email:reg.email};
    return res.json({message:'login successfull'})
  }
  catch(error){
    return res.status(500).json({ message: 'Server error' });
  }
});

// Organizer Schema
const dataSchema = new mongoose.Schema({
  organizer: String,
  eventName: String,
  eventDescription: String,
  eventVenue: String,
  eventDate: String,
  eventTime: String,
  seatsAvailable: Number,
  bookingLink: String
});

const Data = mongoose.model('organizer', dataSchema);

// Add Route
app.post('/add', (req, res) => {
  const newData = new Data(req.body);
  newData.save()
    .then(() => res.json('Data added successfully'))
    .catch((err) => res.status(400).json({ message: 'Error adding data', error: err }));
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
