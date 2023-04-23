const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3001;
const data = require('../db/db.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For serving up static files in the 'public' folder. 
app.use(express.static(path.join(__dirname, 'public')));

// GET route for api/notes endpoint.
app.get('/api/notes', (req, res) => res.json(data));

// POST route for api/notes endpoint.
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };
  data.push(newNote);
  fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(data), err => {
    if (err) throw err;
    res.json(newNote);
  });
});
  
app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);


// cd into DEVELOP before npm start so it can find package-json file.  