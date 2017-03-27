// functions get their context object at execution time
function argsReturner() {
  // 'this' refers to the context object
  var args = Array.prototype.join( arguments, ' - ' );
  return this.argsLabel + args;
}
var myObj = {
  myKey: 'myObj args are: ',
  myMethod: argsReturner
};
myObj.myMethod( 1, 2, 3 ); // myObj args are: 1 - 2 - 3

// here's two identical syntax
argsReturner.call( myObj, 1, 2, 3 );
argsReturner.apply( myObj, [ 1, 2, 3 ]);

// now we can make meaningful constructors
var personProto = { 
  species: 'human',
  greet: function() {
    return 'Hello, my name is ' + this.name;
  }
};

function Person( name ) {
  this.name = name;
  return this;
}
Person.prototype = personProto;

var psnElias = new Person( 'Elias' );
psnElias.greet(); // Hello, my name is Elias
