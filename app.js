
const express = require('express')
const app = express()
const mongoose = require("mongoose")


// Mengatur parsing body dari request menjadi JSON
app.use(express.json());

    // Mongoose Schema for Komentar
const komentarSchema = new mongoose.Schema({
    id: { type: String, required: true },
    konten: { type: String, required: true },
    nama: { type: String, required: true },
    tanggal: { type: Date, default: Date.now },
    idKomentar: { type: String },
  });
  
  // Mongoose Model for Komentar
  const Komentar = mongoose.model('Komentar', komentarSchema);
  
  // Connecting to MongoDB using Mongoose
  mongoose.connect('mongodb+srv://hanif:APASI123@komentarapi.eqwl6k4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  
  // Create a new Komentar
  app.post('/komentar', (req, res) => {
    const { id, konten, nama, idKomentar } = req.body;
    const komentar = new Komentar({ id, konten, nama, idKomentar });
  
    komentar.save()
      .then(() => {
        res.status(201).json({ message: 'Komentar created successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create komentar' });
      });
  });
  
  // Read all Komentar
  app.get('/komentar', (req, res) => {
    Komentar.find()
      .then((komentar) => {
        res.json(komentar);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to read komentar' });
      });
  });
  
  // Delete a Komentar
  app.delete('/komentar/:id', (req, res) => {
    const { id } = req.params;
  
    Komentar.findByIdAndDelete(id)
      .then((komentar) => {
        if (!komentar) {
          res.status(404).json({ error: 'Komentar not found' });
        } else {
          res.json({ message: 'Komentar deleted successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete komentar' });
      });
  });
  
  // Edit a Komentar
  app.put('/komentar/:id', (req, res) => {
    const { id } = req.params;
    const { konten, nama, idKomentar } = req.body;
  
    Komentar.findByIdAndUpdate(id, { konten, nama, idKomentar }, { new: true })
      .then((komentar) => {
        if (!komentar) {
          res.status(404).json({ error: 'Komentar not found' });
        } else {
          res.json({ message: 'Komentar updated successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update komentar' });
      });
  });
  
  // Start the server on port 3000
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });