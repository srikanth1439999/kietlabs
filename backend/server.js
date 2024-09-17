const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const submissionRoutes = require('./routes/routes');
const subRoutes =require('./routes/sub')

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', submissionRoutes);
app.use('/api', subRoutes);
// MongoDB Connection String (replace with your actual username and password)
const mongoURI = 'mongodb+srv://manaclg:12345@cluster0.u0nub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
