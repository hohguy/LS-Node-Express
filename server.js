const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [
  {name: 'person1'},
  {name: 'person2'},
  {name: 'person3'},
];

// get root
app.get('/', (request, response) => {
  response.send('Hello there!');
});

// get entire object or array ?index=
app.get('/users', (req, res) => {
  if (req.query.index !== undefined) res.send(users[req.query.index]);
  res.send(users);
});

// send (small) info at index
app.get('/users/:index', (req, res) => {
  res.send(users[req.params.index]);
});

// send larger object with a post request
app.post('/users', (req, res) => {
  console.log(req.body);
  users.push(req.body.user);
  res.send('User added');
});

app.get('/search', (req, res) => {
  res.send(users.filter(user => user.name === req.query.name));
});

app.delete('/users/:index', (req, res) => {
  users.splice(parseInt(req.params.index), 1);
  res.send('user deleted');
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
