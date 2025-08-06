# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Quick Start

### 1. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
MONGO_URI=mongodb://localhost:27017/pet-shielders
JWT_SECRET=your_secret_key_here
PORT=5000
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd web
npm install
npm start
```

## Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Data
The database will be seeded with 8 sample pets (4 dogs, 4 cats) with detailed information and images.

## Features Available
- ✅ Pet browsing and search
- ✅ Pet details with images
- ✅ Rescue request form
- ✅ Contact form
- ✅ User authentication
- ✅ Advanced filtering (location, breed, age, size, gender)

## Troubleshooting
- Make sure MongoDB is running
- Check that both frontend and backend are running on different ports
- Ensure all environment variables are set correctly 