
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3001
const data = require('../db/db.json');
const path = require('path');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For serving up HTML files. 
app.use(express.static('public')); 

// Route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Develop/public/index.html'));
  });

// Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Develop/public/notes.html'));
    });

app.get('.api/notes', (req, res) => res.json(data));


  
app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);