const mongoose = require('mongoose');
const Plant = require('./models/Plant');
require('dotenv').config();

const plants = [
    {
        name: 'Aloe Vera',
        botanicalName: 'Aloe barbadensis miller',
        description: 'Aloe vera is a succulent plant species of the genus Aloe, known for its medicinal properties and use in skincare.',
        habitat: 'Arid and semi-arid climates',
        medicinalUses: 'Skin healing, burns, moisturizing, digestive aid',
        cultivationMethods: 'Well-drained soil, plenty of sunlight, water sparingly',
        region: 'Africa',
        images: ['aloe_vera.jpg', 'aloe_vera2.jpg', 'aloe_vera3.jpg'],
        commonNames: 'Burn Plant',
        videoUrl: 'https://www.youtube.com/watch?v=example1'
    },
    {
        name: 'Ashwagandha',
        botanicalName: 'Withania somnifera',
        description: 'Ashwagandha is a powerful adaptogenic herb in Ayurvedic healing, known for reducing stress and anxiety.',
        habitat: 'Dry regions of India, the Middle East, and Africa',
        medicinalUses: 'Stress reduction, anxiety relief, energy boost, improved sleep',
        cultivationMethods: 'Sandy loam soil, full sun, moderate watering',
        region: 'India',
        images: ['ashwagandha.jpg', 'ashwagandha2.jpg', 'ashwagandha3.jpg'],
        commonNames: 'Indian Ginseng, Winter Cherry',
        videoUrl: 'https://www.youtube.com/watch?v=example2'
    },
    {
        name: 'Jasmine',
        botanicalName: 'Jasminum spp.',
        description: 'Jasmine is a genus of shrubs and vines in the olive family Oleaceae, widely cultivated for their fragrant flowers used in perfumes and teas.',
        habitat: 'Tropical and subtropical regions of Eurasia, Australasia, and Oceania',
        medicinalUses: 'Fragrance, aromatherapy, some species used in traditional medicine',
        cultivationMethods: 'Well-drained soil, full or partial sun, regular watering',
        region: 'Asia',
        images: ['jasmine.jpg', 'jasmine2.jpg', 'jasmine3.jpg'],
        commonNames: [],
        videoUrl: 'https://www.youtube.com/watch?v=example3'
    },
    {
        name: 'Turmeric',
        botanicalName: 'Curcuma longa',
        description: 'Turmeric is a rhizomatous herbaceous perennial plant of the ginger family, Zingiberaceae, known for its vibrant color and anti-inflammatory properties.',
        habitat: 'Tropical regions of South Asia',
        medicinalUses: 'Anti-inflammatory, antioxidant, potential benefits for heart health and brain function',
        cultivationMethods: 'Warm, humid climate, well-drained soil, partial shade',
        region: 'India',
        images: ['turmeric.jpg', 'turmeric2.jpg', 'turmeric3.jpg'], // Added a third image
        commonNames: 'Haldi',
        videoUrl: 'https://www.youtube.com/embed/l6fVXraw5_w'
    },
    {
        name: 'Lavanga',
        botanicalName: 'Syzygium aromaticum',
        description: 'Lavanga, also known as clove, is the aromatic flower bud of a tree in the family Myrtaceae, native to the Maluku Islands in Indonesia, and used as a spice and in medicine.',
        habitat: 'Tropical climates',
        medicinalUses: 'Pain relief (especially toothache), antioxidant, anti-inflammatory',
        cultivationMethods: 'Tropical climate, well-drained soil, full sun',
        region: 'Indonesia',
        images: ['lavanga.jpg', 'lavanga2.jpg', 'lavanga3.jpg'],
        commonNames: 'Clove',
        videoUrl: 'https://www.youtube.com/watch?v=example5'
    },
    {
        name: 'Tulsi',
        botanicalName: 'Ocimum tenuiflorum',
        description: 'Tulsi, also known as Holy Basil, is an aromatic perennial plant in the family Lamiaceae, native to the Indian subcontinent and widely cultivated as a medicinal and religious herb.',
        habitat: 'Tropical and subtropical regions',
        medicinalUses: 'Stress reduction, immune support, anti-inflammatory, antioxidant',
        cultivationMethods: 'Well-drained soil, plenty of sunlight, regular watering',
        region: 'India',
        images: ['tulsi.jpg', 'tulsi2.jpg', 'tulsi3.jpg'],
        commonNames: 'Holy Basil',
        videoUrl: '' // Add video URL if available
    },
    {
        name: 'Neem',
        botanicalName: 'Azadirachta indica',
        description: 'Neem is a fast-growing evergreen tree in the mahogany family, Meliaceae, native to the Indian subcontinent and known for its various medicinal and insecticidal properties.',
        habitat: 'Tropical and semi-tropical regions',
        medicinalUses: 'Antiseptic, antifungal, antibacterial, skin conditions, pest control',
        cultivationMethods: 'Wide range of soils, full sun, drought-tolerant',
        region: 'India',
        images: ['neem.jpg', 'neem2.jpg', 'neem3.jpg'],
        commonNames: 'Indian Lilac',
        videoUrl: '' // Add video URL if available
    },
    {
        name: 'Ginger',
        botanicalName: 'Zingiber officinale',
        description: 'Ginger is a flowering plant whose rhizome, ginger root or ginger, is widely used as a spice and a folk medicine.',
        habitat: 'Warm, humid climates',
        medicinalUses: 'Nausea relief, digestive aid, anti-inflammatory, pain reduction',
        cultivationMethods: 'Warm, humid climate, well-drained soil, partial shade',
        region: 'Southeast Asia',
        images: ['ginger.jpg', 'ginger2.jpg', 'ginger3.jpg'],
        commonNames: [],
        videoUrl: '' // Add video URL if available
    },
    {
        name: 'Amla',
        botanicalName: 'Phyllanthus emblica',
        description: 'Amla, also known as Indian Gooseberry, is a deciduous tree of the family Phyllanthaceae. Its fruit is highly nutritious and used in traditional medicine.',
        habitat: 'Tropical and subtropical regions of India and Southeast Asia',
        medicinalUses: 'Rich in Vitamin C, antioxidant, immune boosting, hair and skin health',
        cultivationMethods: 'Wide range of soils, full sun, moderate watering',
        region: 'India',
        images: ['amla.jpg', 'amla2.jpg', 'amla3.jpg'],
        commonNames: 'Indian Gooseberry',
        videoUrl: '' // Add video URL if available
    },
    {
        name: 'Lemon Balm',
        botanicalName: 'Melissa officinalis',
        description: 'Lemon balm is a perennial herbaceous plant in the mint family, Lamiaceae, native to south-central Europe and the Mediterranean Basin, cultivated for its lemon-scented leaves.',
        habitat: 'Moist, well-drained soil, partial shade',
        medicinalUses: 'Anxiety relief, sleep aid, antiviral properties, digestive comfort',
        cultivationMethods: 'Moist, well-drained soil, partial shade to full sun, regular watering',
        region: 'Europe, Mediterranean',
        images: ['lemon_balm.jpg', 'lemon_balm2.jpg', 'lemon_balm3.jpg'],
        commonNames: [],
        videoUrl: '' // Add video URL if available
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