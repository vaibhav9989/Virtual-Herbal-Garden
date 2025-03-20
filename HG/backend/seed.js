const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

const plants = [
  {
    name: 'Aloe Vera',
    description: 'Aloe vera is a succulent plant species of the genus Aloe.',
    region: 'Africa',
    images: ['aloe_vera.jpg', 'aloe_vera2.jpg', 'aloe_vera3.jpg'],
    youtubeUrl: 'https://www.youtube.com/watch?v=example1'
  },
  {
    name: 'Ashwagandha',
    description: 'Ashwagandha is a powerful herb in Ayurvedic healing.',
    region: 'India',
    images: ['ashwagandha.jpg', 'ashwagandha2.jpg', 'ashwagandha3.jpg'],
    youtubeUrl: 'https://www.youtube.com/watch?v=example2'
  },
  {
    name: 'Jasmine',
    description: 'Jasmine is a fragrant flower used in perfumes and teas.',
    region: 'Asia',
    images: ['jasmine.jpg', 'jasmine2.jpg', 'jasmine3.jpg'],
    youtubeUrl: 'https://www.youtube.com/watch?v=example3'
  },
  {
    name: 'Turmeric',
    description: 'Turmeric is a spice known for its anti-inflammatory properties.',
    region: 'India',
    images: ['turmeric.jpg', 'turmeric2.jpg'],
    youtubeUrl: 'https://www.youtube.com/embed/l6fVXraw5_w'
  },
  {
    name: 'Lavanga',
    description: 'Lavanga, also known as clove, is a spice used in cooking and medicine.',
    region: 'Indonesia',
    images: ['lavanga.jpg', 'lavanga2.jpg', 'lavanga3.jpg'],
    youtubeUrl: 'https://www.youtube.com/watch?v=example5'
  }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Plant.insertMany(plants);
  })
  .then(() => {
    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error seeding database:', err));