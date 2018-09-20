const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
// knex
const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// CRUD
// POST /posts
app.post('/posts', (req, res)=>{
  console.log(req.body);
  knex('posts').insert({
    content: req.body.content,
    author: req.body.author
  }).then((results)=>{
    res.send(200)
  });
});
// GET /posts
app.get('/posts', (req, res)=>{
  knex('posts').then((results)=>{
    res.json(results);
  })
})
// GET /posts/:id

app.get('/posts/:id', (req, res)=>{
  knex('posts').where('id', req.params.id).then((results)=>{
    res.json(results);
  })
})
// PUT /posts/:id
app.put('/posts/:id', (req, res)=>{
  knex('posts').update({
    content: req.body.content,
    author: req.body.author,
    upvotes: req.body.upvotes
  }).where('id', req.params.id).then((results)=>{
    res.send(200);
  })
})
// DELETE /posts/:id
app.delete('/posts/:id', (req, res)=>{
  knex('posts').delete().where('id', req.params.id).then(()=>{
    res.send(200);
  })
})

app.listen(port, ()=>{
  console.log(`Listening on localhost:${port}`);
})
