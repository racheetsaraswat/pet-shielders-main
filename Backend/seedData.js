const mongoose = require('mongoose');
const Pet = require('./models/pet');
const dotenv = require('dotenv');

dotenv.config();

const samplePets = [
  {
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: 2,
    gender: "Male",
    size: "Large",
    color: "Golden",
    traits: ["Friendly", "Playful", "Good with kids", "Good with other dogs", "Trained"],
    description: "Max is a loving and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with children and other pets, and he's already house-trained. Max is looking for an active family who can give him plenty of exercise and attention.",
    imageUrl: "/d3.jpg",
    additionalImages: ["/d1.jpg", "/d2.jpg", "/d4.jpg"],
    adoptionFee: 250,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Neutered, Vaccinated, Microchipped",
    story: "Max was found as a stray wandering near a park. He was thin and scared but friendly. After being brought to our shelter, he quickly became a staff favorite with his playful personality. Now he's healthy and ready for his forever home!"
  },
  {
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: 1,
    gender: "Female",
    size: "Medium",
    color: "Cream with brown points",
    traits: ["Calm", "Independent", "Affectionate", "Vocal", "Intelligent"],
    description: "Luna is a beautiful Siamese cat with striking blue eyes. She's quite vocal and will let you know when she wants attention. Luna enjoys playing with toys and lounging in sunny spots. She's looking for a quiet home where she can be the queen of the castle.",
    imageUrl: "/c1.jpg",
    additionalImages: ["/c2.jpg", "/c3.jpg", "/c4.jpg"],
    adoptionFee: 150,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Spayed, Vaccinated, Microchipped",
    story: "Luna was surrendered to our shelter when her previous owner had to move to a place that didn't allow pets. She's a sweet girl who loves attention and would make a wonderful companion."
  },
  {
    name: "Buddy",
    type: "Dog",
    breed: "Beagle",
    age: 3,
    gender: "Male",
    size: "Medium",
    color: "Tri-color (Black, White, Brown)",
    traits: ["Energetic", "Curious", "Friendly", "Good with kids", "Loves to sniff"],
    description: "Buddy is an energetic Beagle who loves to explore and follow his nose. He's great with children and other dogs. Buddy would be perfect for an active family who enjoys outdoor activities.",
    imageUrl: "/d1.jpg",
    additionalImages: ["/d2.jpg", "/d3.jpg", "/d4.jpg"],
    adoptionFee: 200,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Neutered, Vaccinated, Microchipped",
    story: "Buddy was surrendered by his previous owner who couldn't give him the attention he needed. He's a sweet boy who just wants to be loved and have adventures."
  },
  {
    name: "Oliver",
    type: "Cat",
    breed: "Tabby",
    age: 4,
    gender: "Male",
    size: "Medium",
    color: "Orange Tabby",
    traits: ["Playful", "Gentle", "Good with other cats", "Loves toys", "Affectionate"],
    description: "Oliver is a handsome orange tabby with a gentle personality. He loves to play with toys and gets along well with other cats. Oliver is looking for a loving home where he can be part of the family.",
    imageUrl: "/c2.jpg",
    additionalImages: ["/c1.jpg", "/c3.jpg", "/c4.jpg"],
    adoptionFee: 120,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Neutered, Vaccinated, Microchipped",
    story: "Oliver was found as a stray and brought to our shelter. Despite his rough start, he's incredibly sweet and loving. He's ready to find his forever home."
  },
  {
    name: "Charlie",
    type: "Dog",
    breed: "Labrador",
    age: 1,
    gender: "Male",
    size: "Large",
    color: "Black",
    traits: ["Energetic", "Friendly", "Trainable", "Good with kids", "Loves water"],
    description: "Charlie is a young, energetic Labrador who loves to play and swim. He's very trainable and would be perfect for an active family. Charlie is looking for a home where he can get plenty of exercise and love.",
    imageUrl: "/d4.jpg",
    additionalImages: ["/d1.jpg", "/d2.jpg", "/d3.jpg"],
    adoptionFee: 300,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Neutered, Vaccinated, Microchipped",
    story: "Charlie was surrendered because his previous owner couldn't handle his energy level. He's a wonderful dog who just needs the right family to give him the attention and exercise he deserves."
  },
  {
    name: "Milo",
    type: "Cat",
    breed: "Maine Coon",
    age: 3,
    gender: "Male",
    size: "Large",
    color: "Brown Tabby",
    traits: ["Gentle", "Sociable", "Intelligent", "Loves heights", "Affectionate"],
    description: "Milo is a majestic Maine Coon with a gentle giant personality. He loves to climb and observe from high places. Milo is very sociable and gets along well with everyone.",
    imageUrl: "/c3.jpg",
    additionalImages: ["/c1.jpg", "/c2.jpg", "/c4.jpg"],
    adoptionFee: 180,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Neutered, Vaccinated, Microchipped",
    story: "Milo was found wandering the streets and brought to our shelter. He's a gentle giant who loves attention and would make a wonderful companion."
  },
  {
    name: "Daisy",
    type: "Dog",
    breed: "Poodle",
    age: 2,
    gender: "Female",
    size: "Medium",
    color: "White",
    traits: ["Smart", "Active", "Affectionate", "Hypoallergenic", "Good with kids"],
    description: "Daisy is a smart and active Poodle who loves to learn new tricks. She's hypoallergenic and great with children. Daisy would be perfect for a family who enjoys training and activities.",
    imageUrl: "/d2.jpg",
    additionalImages: ["/d1.jpg", "/d3.jpg", "/d4.jpg"],
    adoptionFee: 280,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Spayed, Vaccinated, Microchipped",
    story: "Daisy was surrendered when her owner had to move overseas. She's a wonderful dog who loves to learn and play. She's ready to find her new family."
  },
  {
    name: "Bella",
    type: "Cat",
    breed: "Persian",
    age: 5,
    gender: "Female",
    size: "Medium",
    color: "White",
    traits: ["Quiet", "Gentle", "Affectionate", "Loves to be groomed", "Calm"],
    description: "Bella is a beautiful Persian cat with a calm and gentle personality. She loves to be groomed and enjoys quiet time. Bella would be perfect for someone looking for a peaceful companion.",
    imageUrl: "/c4.jpg",
    additionalImages: ["/c1.jpg", "/c2.jpg", "/c3.jpg"],
    adoptionFee: 160,
    location: "Pet City Shelter",
    address: "123 Adoption Street, Pet City, PC 12345",
    medicalInfo: "Spayed, Vaccinated, Microchipped",
    story: "Bella was surrendered when her elderly owner could no longer care for her. She's a sweet girl who just wants a quiet home where she can be loved."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Pet.deleteMany({});
    console.log('Cleared existing pet data');

    // Insert sample data
    const insertedPets = await Pet.insertMany(samplePets);
    console.log(`Inserted ${insertedPets.length} pets`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 