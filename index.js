var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
// App Constants
var MENSAJE = process.env.MENSAJE

var PORT = process.env.PORT || 3000
// var DB_URL = 'mongodb://localhost/test'
var DB_URL = 'mongodb://localhost/books_app'

// console.log(MENSAJE)

// Connect to DB
mongoose.connect(DB_URL)

// Setup Book Model
var Book = mongoose.model('Book', { name: String })

// Initialize your express app
var app = express()

// Set up middleware
app.use(express.static('public'))
app.use(bodyParser.json())

// Set up Root Route
app.get('/', function(request, response){
  response.sendFile(__dirname + '/public/index.html')
})

// Restful routes for 'books'
app.get('/books', function(request, response){
  Book
  .find({})
  .exec(function(err, result){
    response.json(result)
  })
})

// Restful routes for 'books'
app.get('/books/:id', function(request, response){
  Book
  .find({_id:request.params.id})
  .exec(function(err, result){
    response.json(result)
  })
})

app.post('/books', function(request, response){
  var theBook = new Book(request.body)
  console.log("y");
  theBook.save(function (err, book) {
    if (err) {
      throw err
    } else {
      response.json(theBook)
    }
  })
})

app.patch('/books/:id', function(request, response){
  console.log(request);
  Book.findOneAndUpdate({_id:request.params.id}, request.body, function (err, book) {
    if (err) {
      throw err
    } else {
      response.json(book)
    }
  })
})

app.delete('/books/:id', function(request, response){
  Book.remove({_id: request.params.id}, function (err) {
    if (err) {
      throw err
    } else {
      response.json({message: 'succesfully removed book'})
    }
  })
})

app.listen(PORT, function(){
  console.log("Server started on port", PORT)
})
