const Equipment = require('../models/Equipment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
  }
}).single('image');

exports.addEquipment = async (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: 'Unknown error: ' + err.message });
    }
    try {
      const {
        name,
        description,
        condition,
        rentalPrice,
        availabilityDate,
        ownerName,
        address,
        contactNumber,
      } = req.body;

      if (!name || !description || !condition || !rentalPrice || !availabilityDate || !ownerName || !address || !contactNumber) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const parsedAvailabilityDate = JSON.parse(availabilityDate);
      const startDate = new Date(parsedAvailabilityDate.start.year, parsedAvailabilityDate.start.month - 1, parsedAvailabilityDate.start.day);
      const endDate = new Date(parsedAvailabilityDate.end.year, parsedAvailabilityDate.end.month - 1, parsedAvailabilityDate.end.day);

      const newEquipment = new Equipment({
        name,
        description,
        condition,
        rentalPrice: parseFloat(rentalPrice),
        availabilityDateStart: startDate,
        availabilityDateEnd: endDate,
        image: req.file.filename,
        ownerName,
        address,
        contactNumber,
        userId: req.user._id
      });

      await newEquipment.save();
      res.status(201).json({ message: 'Equipment added successfully', equipment: newEquipment });
    } catch (error) {
      console.error('Error adding equipment:', error);
      res.status(400).json({ error: 'Failed to add equipment: ' + error.message });
    }
  });
};

exports.getUserEquipment = async (req, res) => {
  try {
   
    const equipment = await Equipment.find({ userId: req.user._id });
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching user equipment:', error);
    res.status(500).json({ error: 'Failed to fetch user equipment' });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    
    
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching all equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};
exports.updateEquipment = async (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: 'Unknown error: ' + err.message });
    }
    try {
      const equipment = await Equipment.findOne({ _id: req.params.id, userId: req.user._id });
      if (!equipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      const updatedFields = { ...req.body };

      if (req.file) {
        // Delete old image
        if (equipment.image) {
          const oldImagePath = path.join(uploadDir, equipment.image);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err);
          });
        }
        updatedFields.image = req.file.filename;
      }

      if (updatedFields.availabilityDate) {
        const parsedAvailabilityDate = JSON.parse(updatedFields.availabilityDate);
        updatedFields.availabilityDateStart = new Date(parsedAvailabilityDate.start.year, parsedAvailabilityDate.start.month - 1, parsedAvailabilityDate.start.day);
        updatedFields.availabilityDateEnd = new Date(parsedAvailabilityDate.end.year, parsedAvailabilityDate.end.month - 1, parsedAvailabilityDate.end.day);
        delete updatedFields.availabilityDate;
      }

      const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
      res.json(updatedEquipment);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update equipment: ' + error.message });
    }
  });
};

exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    // Delete associated image
    if (equipment.image) {
      const imagePath = path.join(uploadDir, equipment.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to delete image:', err);
      });
    }
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
};