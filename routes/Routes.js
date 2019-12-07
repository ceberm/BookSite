const express = require('express');
var fs = require("fs");
var crypto = require('crypto');
const router = express.Router();
var booksLength = 0;
var usersLength = 0;
//bookList is the name for books.json
var bookList;
var users;

readFiles();

router.get('/Users', function (req, res) {
    console.log(users.users);
   res.render('Users', {
      users: users.users
   });
})

router.get('/User', function(req, res) {
   res.render('User');
});

router.get('/Books', function (req, res) {
   res.render('Books', {
      books: bookList.books
   });
})

router.get('/Book', function(req, res) {
   res.render('Book');
});

router.post('/Users/Created', function(req, res) {

var newUser = {"first_name" : req.body.first_name, "last_name": req.body.last_name, "id" : req.body.id,
                  "status": req.body.status,"join_date" : req.body.join_date};
                  
if(users == null) readFiles();
   var list = users.users;
   users.users[usersLength++] = newUser;
   console.log(users);

      var jsonContent = JSON.stringify(users);

      fs.writeFile("./users.json", jsonContent , 'utf8', function (err) {
         if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
         }
         res.render('created', {
               currentObject: "user",
               name: req.body.first_name + ' ' + req.body.last_name
         });
      });
         console.log("JSON file has been saved.");
  
});

router.post('/Book/Created', function(req, res) {

var newBook = {"name" : req.body.name, "author": req.body.author, "img" : "11870085.jpg",
                  "publish_date": req.body.publish_date,"description" : req.body.description};
                  
if(bookList == null) readFiles();
   var books = bookList.books;
   bookList.books[booksLength++] = newBook;
   console.log(bookList);

      //var jsonObj = JSON.parse(json); 
      console.log(bookList);
      var jsonContent = JSON.stringify(bookList);

      fs.writeFile("./books.json", jsonContent , 'utf8', function (err) {
         if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
         }
         res.render('created', {
               currentObject: "book named",
               name: req.body.name
         });
      });
         console.log("JSON file has been saved.");
  
});

router.get('/Users', function (req, res) {
   res.render('Users', {
      users: bookList.books
   });
})

router.get('/', function(req,res){
   //console.log(cryptoRandomNumber(0,100));
   console.log("# of Books " + booksLength);
   console.log("# of users " + usersLength);
   res.render('index');
   /*
   var drinks = [
      { name: 'Bloody Mary', drunkness: 3 },
      { name: 'Martini', drunkness: 5 },
      { name: 'Scotch', drunkness: 10 }
  ];
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('index', {
      drinks: drinks,
      tagline: tagline
  });*/
});


/*
Generating random numbers in specific range using crypto.randomBytes from crypto library
Maximum available range is 281474976710655 or 256^6-1
Maximum number for range must be equal or less than Number.MAX_SAFE_INTEGER (usually 9007199254740991)
Usage examples:
cryptoRandomNumber(0, 350);
cryptoRandomNumber(556, 1250425);
cryptoRandomNumber(0, 281474976710655);
cryptoRandomNumber((Number.MAX_SAFE_INTEGER-281474976710655), Number.MAX_SAFE_INTEGER);

Tested and working on 64bit Windows and Unix operation systems.
*/

function cryptoRandomNumber(minimum, maximum){
	var distance = maximum-minimum;
	
	if(minimum>=maximum){
		console.log('Minimum number should be less than maximum');
		return false;
	} else if(distance>281474976710655){
		console.log('You can not get all possible random numbers if range is greater than 256^6-1');
		return false;
	} else if(maximum>Number.MAX_SAFE_INTEGER){
		console.log('Maximum number should be safe integer limit');
		return false;
	} else {
		var maxBytes = 6;
		var maxDec = 281474976710656;
		
		// To avoid huge mathematical operations and increase function performance for small ranges, you can uncomment following script
		/*
		if(distance<256){
			maxBytes = 1;
			maxDec = 256;
		} else if(distance<65536){
			maxBytes = 2;
			maxDec = 65536;
		} else if(distance<16777216){
			maxBytes = 3;
			maxDec = 16777216;
		} else if(distance<4294967296){
			maxBytes = 4;
			maxDec = 4294967296;
		} else if(distance<1099511627776){
			maxBytes = 4;
			maxDec = 1099511627776;
		}
		*/
		
		var randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16);
		var result = Math.floor(randbytes/maxDec*(maximum-minimum+1)+minimum);
		
		if(result>maximum){
			result = maximum;
		}
		return result;
	}
}

function getLength(data){
   var count = 0;
   for(var i = 0 in data){
      count++;i++;
   }
   return count;
}

function readFiles(){
   fs.readFile( "./" + "books.json", 'utf8', function (err, data) {
   console.log("STARTING Server:: Reading Books JSON File");
      bookList = JSON.parse(data); 
      booksLength = getLength(bookList.books);
});

fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
   console.log("STARTING Server:: Reading Users JSON File");
      users = JSON.parse(data); 
      usersLength = getLength(users.users);
});
}

module.exports = router