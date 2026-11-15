const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/wellnessAppDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Optional fields
  fullName: { type: String },
  age: { type: Number },
  gender: { type: String },
  contactNumber: { type: String },
  weight: { type: Number }, // Add weight
  height: { type: Number },
  bodyType: { type: String, enum: ["Slim", "Medium", "Heavy"] },
  skinType: { type: String, enum: ["Dry", "Normal", "Oily", "Sensitive"] },
  hairType: { type: String, enum: ["Dry", "Normal", "Oily"] },
  eyeShape: { type: String, enum: ["Dull", "Normal", "Sharp"] },
  sleepPattern: { type: String, enum: ["Deep", "Disturbed", "Light Sleeper"] },
  foodPreference: { type: String, enum: ["Veg", "Non-Veg", "Vegan", "Mixed"] },
  appetiteLevel: { type: String, enum: ["Low", "Medium", "High"] },
  thirstLevel: { type: String, enum: ["Low", "Medium", "High"] },
  exerciseRoutine: { type: String, enum: ["Sedentary", "Moderate", "Active"] },
  stressLevels: { type: String, enum: ["Low", "Medium", "High"] },
  decisionMakingStyle: { type: String, enum: ["Impulsive", "Balanced", "Analytical"] },
  memoryStrength: { type: String, enum: ["Weak", "Moderate", "Sharp"] },
  socialBehavior: { type: String, enum: ["Introvert", "Extrovert", "Balanced"] },
  comfortableClimate: { type: String, enum: ["Cold", "Warm", "Hot", "Rainy"] },
  seasonalHealthSensitivity: { type: String, enum: ["Summer", "Winter", "Monsoon"] },
  sensitivityToTemperature: { // New attribute
    type: String,
    enum: ["Gets Cold Easily", "Can’t Tolerate Heat", "Adapts Well to Any Weather"],
  },
  comfortWithHumidity: { // New attribute
    type: String,
    enum: ["Prefers Dry Climate", "Prefers Humid Climate", "Comfortable in Any Climate"],
  },
});

const User = mongoose.model("User", userSchema);

// Personal Details Schema
const personalDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true },
  weight: { type: Number }, // Add weight field
  height: { type: Number },
}, { timestamps: true });

const PersonalDetails = mongoose.model("PersonalDetails", personalDetailsSchema);

// Physical Attributes Schema
const physicalAttributesSchema = new mongoose.Schema({
  bodyType: { type: String, enum: ["Slim", "Medium", "Heavy"], required: true },
  skinType: { type: String, enum: ["Dry", "Normal", "Oily", "Sensitive"], required: true },
  hairType: { type: String, enum: ["Dry", "Normal", "Oily"], required: true },
  eyeShape: { type: String, enum: ["Dull", "Normal", "Sharp"], required: true },
}, { timestamps: true });

const PhysicalAttributes = mongoose.model("PhysicalAttributes", physicalAttributesSchema);

// Lifestyle Schema
const lifestyleSchema = new mongoose.Schema({
  sleepPattern: { type: String, enum: ["Deep", "Disturbed", "Light Sleeper"], required: true },
  foodPreference: { type: String, enum: ["Veg", "Non-Veg", "Vegan", "Mixed"], required: true },
  appetiteLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },
  thirstLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },
  exerciseRoutine: { type: String, enum: ["Sedentary", "Moderate", "Active"], required: true },
}, { timestamps: true });

const Lifestyle = mongoose.model("Lifestyle", lifestyleSchema);

// Mental & Emotional Schema
const mentalEmotionalSchema = new mongoose.Schema({
  stressLevels: { type: String, enum: ["Low", "Medium", "High"], required: true },
  decisionMakingStyle: { type: String, enum: ["Impulsive", "Balanced", "Analytical"], required: true },
  memoryStrength: { type: String, enum: ["Weak", "Moderate", "Sharp"], required: true },
  socialBehavior: { type: String, enum: ["Introvert", "Extrovert", "Balanced"], required: true },
}, { timestamps: true });

const MentalEmotional = mongoose.model("MentalEmotional", mentalEmotionalSchema);

// Climate Preferences Schema
const climatePreferencesSchema = new mongoose.Schema({
  comfortableClimate: { type: String, enum: ["Cold", "Warm", "Hot", "Rainy"], required: true },
  seasonalHealthSensitivity: { type: String, enum: ["Summer", "Winter", "Monsoon"], required: true },
  sensitivityToTemperature: { // New attribute
    type: String,
    enum: ["Gets Cold Easily", "Can’t Tolerate Heat", "Adapts Well to Any Weather"],
    required: true,
  },
  comfortWithHumidity: { // New attribute
    type: String,
    enum: ["Prefers Dry Climate", "Prefers Humid Climate", "Comfortable in Any Climate"],
    required: true,
  },
}, { timestamps: true });

const ClimatePreferences = mongoose.model("ClimatePreferences", climatePreferencesSchema);

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const userData = { ...user._doc };
    delete userData.password;
    res.json({ success: true, user: userData }); // Return user data on successful login
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Save Personal Details Route
app.post("/api/users/personal-details", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { fullName, age, gender, contactNumber, email, weight, height } = req.body;

    // Validate required fields
    if (!fullName || !age || !gender || !email || !weight || !height) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user already exists
    const existingUser = await PersonalDetails.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Details already exist for this email" });
    }

    // Save new details
    const newEntry = new PersonalDetails({ fullName, age, gender, contactNumber, email, weight, height });
    await newEntry.save();

    res.status(201).json({ message: "Personal details saved successfully" });
  } catch (error) {
    console.error("Error saving details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Save Physical Attributes Route
app.post("/api/users/physical-attributes", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { bodyType, skinType, hairType, eyeShape } = req.body;

    // Validate required fields
    if (!bodyType || !skinType || !hairType || !eyeShape) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save new physical attributes
    const newAttributes = new PhysicalAttributes({ bodyType, skinType, hairType, eyeShape });
    await newAttributes.save();

    res.status(201).json({ message: "Physical attributes saved successfully" });
  } catch (error) {
    console.error("Error saving physical attributes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Save Lifestyle Route
app.post("/api/users/lifestyle", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { sleepPattern, foodPreference, appetiteLevel, thirstLevel, exerciseRoutine } = req.body;

    // Validate required fields
    if (!sleepPattern || !foodPreference || !appetiteLevel || !thirstLevel || !exerciseRoutine) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save new lifestyle data
    const newLifestyle = new Lifestyle({ sleepPattern, foodPreference, appetiteLevel, thirstLevel, exerciseRoutine });
    await newLifestyle.save();

    res.status(201).json({ message: "Lifestyle data saved successfully" });
  } catch (error) {
    console.error("Error saving lifestyle data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Save Mental & Emotional Route
app.post("/api/users/mental-emotional", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { stressLevels, decisionMakingStyle, memoryStrength, socialBehavior } = req.body;

    // Validate required fields
    if (!stressLevels || !decisionMakingStyle || !memoryStrength || !socialBehavior) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save new mental & emotional data
    const newMentalEmotional = new MentalEmotional({ stressLevels, decisionMakingStyle, memoryStrength, socialBehavior });
    await newMentalEmotional.save();

    res.status(201).json({ message: "Mental & Emotional data saved successfully" });
  } catch (error) {
    console.error("Error saving mental & emotional data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Save Climate Preferences Route
app.post("/api/users/climate-preferences", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { comfortableClimate, seasonalHealthSensitivity, sensitivityToTemperature, comfortWithHumidity} = req.body;

    // Validate required fields
    if (!comfortableClimate || !seasonalHealthSensitivity ||
      !sensitivityToTemperature ||
      !comfortWithHumidity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save new climate preferences
    const newClimatePreferences = new ClimatePreferences({ comfortableClimate, seasonalHealthSensitivity, sensitivityToTemperature, comfortWithHumidity });
    await newClimatePreferences.save();

    res.status(201).json({ message: "Climate preferences saved successfully" });
  } catch (error) {
    console.error("Error saving climate preferences:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Fetch Full Name for Certificate
app.get("/api/certificate/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user in the "personaldetails" collection
    const user = await PersonalDetails.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ fullName: user.fullName });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const generateCustomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// Usage
const id = generateCustomId();

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all personal details
app.get("/api/users/personal-details", async (req, res) => {
  try {
    const details = await PersonalDetails.find({});
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all physical attributes
app.get("/api/users/physical-attributes", async (req, res) => {
  try {
    const attributes = await PhysicalAttributes.find({});
    res.json(attributes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all lifestyle data
app.get("/api/users/lifestyle", async (req, res) => {
  try {
    const lifestyle = await Lifestyle.find({});
    res.json(lifestyle);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all mental & emotional data
app.get("/api/users/mental-emotional", async (req, res) => {
  try {
    const mentalEmotional = await MentalEmotional.find({});
    res.json(mentalEmotional);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all climate preferences
app.get("/api/users/climate-preferences", async (req, res) => {
  try {
    const climatePreferences = await ClimatePreferences.find({});
    res.json(climatePreferences);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));