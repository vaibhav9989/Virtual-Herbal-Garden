const Plant = require('../models/Plant');

// Get all plants with search and filter
exports.getAllPlants = async (req, res) => {
  try {
    const { search, region } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (region) {
      query.region = region;
    }

    const plants = await Plant.find(query);
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other controller methods remain the same...

// Get a single plant by ID
exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new plant
exports.addPlant = async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    description: req.body.description,
    region: req.body.region,
    images: req.body.images,
    youtubeUrl: req.body.youtubeUrl
  });

  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a plant
exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(plant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a plant
exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};