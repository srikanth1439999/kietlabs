const mongoose = require('mongoose');

// Define the schema for submissions
const submissionSchema = new mongoose.Schema({
  rollNo: { type: String, required: true ,unique:true},
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  lab: { type: String, required: true }, // AI, VR_AR, Humanoid, Drones, or Cyber
  pythonRating: { type: Number, required: true }, // 1 to 10
  aiMlRating: { type: Number, required: true },   // 1 to 10
  mobileNo: { type: String, required: true },
  email: { type: String, required: true,unique:true },
});

// Export the model
module.exports = mongoose.model('Submission', submissionSchema);
