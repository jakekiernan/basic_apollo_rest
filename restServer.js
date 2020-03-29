const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    pages: 300
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    pages: 250
  },
];

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => res.send(books))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
