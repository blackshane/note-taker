const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));

const { v4: uuidv4 } = require('uuid');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For serving up static files in the 'public' folder. 
app.use(express.static(path.join(__dirname, '../public')));

// GET route for api/notes endpoint.
app.get('/api/notes', (req, res) => {
  res.json(data);
  console.log('GET request for notes received.');
});

// POST route for api/notes endpoint.
app.post('/api/notes', (req, res) => {
  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };

    data.push(newNote);
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(data), err => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.json(newNote);
      console.log('POST request for notes received.', data);
    });
  } else {
    console.log('POST request received with no body.');
    res.status(400).send('Bad Request');
  }
});


  
app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);



// cd into DEVELOP before npm start so it can find package-json file.  