const mongoose = require('mongoose');
const Flower = require('./models/Flower');

const db = 'mongodb+srv://moldiryergesh:Vekz2006@cluster0.ybkq4mp.mongodb.net/?appName=Cluster0';

mongoose.connect(db)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.log("connecting error:");
    console.log(err);
  });

const flowers = [
  {
    name: "Bloom of Friendship",
    description: "Gentle pink tones symbolizing care and kindness.",
    price: 21000,
    imageUrl: "images/5.jpg",
    category: "Bouquet"
  },
  {
    name: "Magic Petals",
    description: "A spellbinding bouquet full of grace and color.",
    price: 34000,
    imageUrl: "images/6.jpg",
    category: "Bouquet"
  },
  {
    name: "Twilight Harmony",
    description: "Delicate lavender petals reflecting calm and balance.",
    price: 27000,
    imageUrl: "images/7.jpg",
    category: "Bouquet"
  },
  {
    name: "Eternal Grace",
    description: "Soft white blooms that whisper timeless elegance.",
    price: 25000,
    imageUrl: "images/8.jpg",
    category: "Bouquet"
  },
  {
    name: "Petal Whispers",
    description: "Soft pastel roses, pure as friendship itself.",
    price: 29000,
    imageUrl: "images/9.jpg",
    category: "Bouquet"
  },
  {
    name: "Harmony Bloom",
    description: "Fresh peonies and tulips bringing peace to the heart.",
    price: 31000,
    imageUrl: "images/10.jpg",
    category: "Bouquet"
  },
  {
    name: "Spring’s Kiss",
    description: "A lively collection of blossoms to brighten any day.",
    price: 23000,
    imageUrl: "images/22.jpg",
    category: "Bouquet"
  },
  {
    name: "Dreamlight",
    description: "Soft glowing hues inspired by twilight and dreams.",
    price: 26000,
    imageUrl: "images/21.jpg",
    category: "Bouquet"
  }
];

const seedDB = async () => {
  try {
    await Flower.deleteMany({});
    await Flower.insertMany(flowers);
    console.log("Database seeded! ");
  } catch (err) {
    console.log("inserting error:", err);
  } finally {
    mongoose.connection.close();
  }
};
seedDB();