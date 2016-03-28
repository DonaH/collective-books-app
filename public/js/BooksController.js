angular.module('BookApp')
  .controller('BooksController', BooksController)

BooksController.$inject = ['$http', '$log'];
function BooksController($http, $log){ //Our controller depends on the core $http & $log services
  var vm = this;
  vm.all = [] //empty array to hold books
  vm.newBook = {} //empty object to hold our new book
  vm.addBook = addBook;
  vm.showBook = showBook;
  vm.updateBook = updateBook;
  vm.removeBook = removeBook;
  vm.getBooks = getBooks;
  vm.editable = false;
  vm.displayInfo = displayInfo;

  function getBooks(){
    $http({
      method: 'GET',
      url : 'http://localhost:3000/books'
    })
    // .get('http://localhost:3000/books')
    .then(function(response){ //promise
        console.log(response.data);
        vm.all = response.data;
    })
  }
    getBooks(); //To load the list on page load

    function addBook(){
      $http
        .post('/books',vm.newBook)
        .then(function(response){
          vm.newBook = {}
          $log.info(response)
          getBooks(); //updates array

        })
    }

    function updateBook(book){  //passes the book object from whichver book is being updated in the view
      $http
        .patch("/books/"+book._id, book ) //We pass the book object as data
        .then(function(response){
          $log.info(response)
        })
    }

    function showBook(book){
      $http
        .get("/books/"+book._id)
        .then(function(response){
          $log.info(response)
          vm.displayInfo(book)
        })
    }

    function removeBook(book){

      $http
        .delete("/books/"+book._id)
        .then(function(respone){
          // var index = vm.all.indexOf(book)
          // vm.all.splice(index,1)//remove one element at position
          getBooks(); //makes an api call, which updates our model, and therefore our view updates...no need for manual removal
        });
    };

    function displayInfo(book){ //book object is passed through from view
      vm.currentBook = book  //sets our currently active book variable
    }
  }
