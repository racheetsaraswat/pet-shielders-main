# Pet Shielders - Pet Adoption Platform

A comprehensive pet adoption platform where users can browse, adopt, and rescue pets. Built with React frontend and Node.js/Express backend with MongoDB database.

## Features

### 🏠 Pet Adoption
- Browse available pets with detailed information
- Advanced search and filtering by type, breed, age, size, gender, and location
- Detailed pet profiles with multiple images
- Adoption process information

### 🚨 Pet Rescue
- Report pets in need of rescue or emergency assistance
- Comprehensive rescue form with urgency levels
- Emergency contact information
- Rescue process explanation

### 📞 Contact & Support
- Contact form for general inquiries
- Multiple contact methods (phone, email, social media)
- Interactive map showing shelter location

### 🔐 User Authentication
- User registration and login
- Secure authentication with JWT tokens

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS3 with modern styling
- Responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS enabled

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Seed the database with sample pet data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Pets
- `GET /api/pets` - Get all pets (with optional filters)
- `GET /api/pets/:id` - Get specific pet by ID
- `POST /api/pets` - Create new pet (admin only)
- `PUT /api/pets/:id` - Update pet (admin only)
- `DELETE /api/pets/:id` - Delete pet (admin only)

### Rescue
- `GET /api/rescue` - Get all rescue requests (admin only)
- `POST /api/rescue` - Create new rescue request
- `PUT /api/rescue/:id` - Update rescue request (admin only)
- `GET /api/rescue/:id` - Get specific rescue request

### Contact
- `GET /api/contact` - Get all contact messages (admin only)
- `POST /api/contact` - Create new contact message
- `PUT /api/contact/:id` - Update contact message (admin only)
- `GET /api/contact/:id` - Get specific contact message

## Project Structure

```
pet-shielders-main/
├── Backend/
│   ├── models/
│   │   ├── user.js
│   │   ├── pet.js
│   │   ├── rescue.js
│   │   └── contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── pets.js
│   │   ├── rescue.js
│   │   └── contact.js
│   ├── server.js
│   ├── seedData.js
│   └── package.json
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthContext.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── PetCard.js
│   │   │   └── SearchFilter.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── PetListing.js
│   │   │   ├── PetDetails.js
│   │   │   ├── RescuePage.js
│   │   │   ├── Contact.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   └── App.js
│   ├── public/
│   │   └── (images and static files)
│   └── package.json
└── README.md
```

## Features in Detail

### Pet Search & Filtering
- Search by location, pet type, breed, age, size, and gender
- Real-time filtering with URL parameters
- Responsive grid layout for pet cards

### Pet Details
- Comprehensive pet information including medical history
- Multiple image gallery
- Adoption process steps
- Similar pets recommendations

### Rescue System
- Emergency reporting form
- Urgency level classification
- Step-by-step rescue process explanation
- Emergency contact information

### Contact System
- Multiple contact methods
- Interactive map integration
- Social media links
- Professional contact form

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact us through the contact form on the website or email us at info@petshielders.com 