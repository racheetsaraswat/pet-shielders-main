// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require("./routes/auth")
const pets = require("./routes/pets")
const rescue = require("./routes/rescue")
const contact = require("./routes/contact")
const adoption = require("./routes/adoption")
const visits = require("./routes/visits")

const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Example POST route
app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.json({ message: 'Data received successfully', data });
});

// API Routes
app.use("/api/auth", auth)
app.use("/api/pets", pets)
app.use("/api/rescue", rescue)
app.use("/api/contact", contact)
app.use("/api/adoption", adoption)
app.use("/api/visits", visits)


// Debug route to check all registered routes
app.get('/api/routes', (req, res) => {
  res.json({
    message: 'Available routes',
    routes: [
      '/api/auth',
      '/api/pets', 
      '/api/rescue',
      '/api/contact',
      '/api/adoption',
      '/api/visits',

    ]
  });
});



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    // Start server only after MongoDB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
