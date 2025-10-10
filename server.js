require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const feedbackRoutes = require('./models/routes/feedback');
const adminRoutes = require('./models/routes/admin');

const app = express();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', feedbackRoutes);

app.use('/api/admin', (req, res, next) => {
  const token = req.headers['authorization'];
  console.log("Received token:", token);
  console.log("Expected token:", process.env.ADMIN_TOKEN);

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).send('unauthorized');
  }
  next();
}, adminRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))});
  
  app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods:["GET","POST"]

  }));

const corsOptions = { origin: process.env.CLIENT_ORIGIN || '*' };
app.use(cors(corsOptions));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => 
      console.log('Server running on port', process.env.PORT || 5000)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));