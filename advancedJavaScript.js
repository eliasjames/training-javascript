// PRIMITIVE DATA TYPES
// boolean 
true
// numeric
5
// string
'5'

// typeof operator
typeof 5;
// 'number'
typeof '5';
// 'string'

// abstract comparison (double equals) performs conversion
5 == '5';
// true

// strict comparison (triple equals) without conversion
5 === '5';
// false 

// primitives are immutable - can't be changed
7 = 5;
'one string' = 'another string';
7 = '7';
// all error - "invalid left hand assignment"

// OBJECTS AND FUNCTIONS
// Objects are collections of properties
// object literal syntax
var personObject = {
  name: 'Elias',
  hair: 'brown'
};
// Object.create syntax
var personObject = Object.create({
  name: 'Elias',
  hair: 'brown'
});

// Functions take arguments, execute statements, and return a value
function doubleIt( doublee ) {
  return doublee + doublee;
}
doubleIt( 3 );
// 6

// functions return a default value if nothing else specified
function stillReturns() {
  var multiLine =  'Without an explicit return statement, ' +
    ' this function will return a default value. ' +
    'Default value is usually undefined.';
}
stillReturns();
// undefined

// A method is an object property which has a function as its value
var simpleMath = {
  doubler: doubleIt
}
simpleMath.doubler( 4 );
// 8

// Functions are also objects
doubleIt.luckyNumber = 13;

// PROTOTYPE CHAIN

// primitives don't have methods
// this will result in a syntax error
5.toString();
// but with the right syntax JS will perform type conversion
'several words'.length;
(5).toString();

// JS is converting again
( new String( 'several words' )).length;
( new Number( 5 )).toString();

// explicit conversion - no longer primitive
var convertedString = ( new String( 'several words' ));
typeof convertedString;
// 'object'

// convertedString is a regular object...
convertedString.luckyNumber = 7;
// but still compares to the primitive
convertedString == 'several words';
// true (note double equals)
// comparison based on valueOf method
convertedString.valueOf();
//'several words'
typeof convertedString.valueOf();
// 'string'

// hasOwnProperty
convertedString.hasOwnProperty('luckyNumber');
// true
convertedString.hasOwnProperty('length');
// false 
convertedString.hasOwnProperty('valueOf');
// false 
String.hasOwnProperty('length');
// true 
String.hasOwnProperty('valueOf');
// false 
Object.prototype.hasOwnProperty('valueOf');
// true 

// relationship preserved
convertedString instanceof String;
// true
String instanceof Object
// true
convertedString instanceof Object
// true

// __proto__ property refers to creator prototype
convertedString.__proto__
// [String: '']
convertedString.__proto__ === String.prototype
// true

// all objects descend from the base Object
String.__proto__
// [Function]
String.__proto__ === Function.prototype
// true
String.__proto__.__proto__
// {}

// descendent objects can access all properties on creator prototype 
// but if descendent object has its own property, will override
var feelyString = String;
feelyString.prototype.emotion = 'neutral';
var angryString = new feelyString('furious text');
angryString.emotion = 'angry';
var flatString = new feelyString('ordinary content');
angryString.emotion;
// 'angry'
flatString.emotion;
// 'neutral'
flatString.hasOwnProperty('emotion')
// false
angryString.hasOwnProperty('emotion')
// true

// WARNING!!
alert( 'WARNING!!' );
// code above altered the built-in String 
// (because feelyString.prototype === String.prototype)
var regularString = new String('shouldnt have emotion');
regularString.emotion
// 'neutral'
// altering built-in data types can have dangerous effects
// plus it doesnt do what we want, which is to sub-class
// but first, 'this'

// FUNCTION CONTEXT AND 'this'
// 'this' represents the object the function is acting on
function addTwo() {
  return this.first + this.second; 
}
// global context by default
addTwo();
// NaN
// (because there's no 'first' and 'second' on global)

// context can be passed via call()
addTwo.call( { first: 5, second: 6 } );
// 11

// when used as methods, functions get 'this' from the object
var parentContext = {
  first: 2,
  second: 3,
  addition: addTwo
}
parentContext.addTwo();
// 5

// apply() is like call(), but takes arguments as an array
// bind() permanently sets the value of 'this'
addTwo.bind( parentContext );
addTwo();
//5

// INHERITANCE & 'new'
// First, let's look at what 'new' does in plain JS
// Use an ordinary function for init (aka a constructor)
function Person( name ) {
  this.name = name;
  this.canTalk = true;
}
// Set a prototype property on that function's object
var basePerson = {
  species: 'human',
  greet: function() {
    if ( this.canTalk ) {
      console.log( 'Hello, I am ' + this.name ); 
    }
  }
};
// create a new object by cloning prototype
var firstPerson = Object.create( basePerson );
//  relationship is preserved
firstPerson.__proto__ === basePerson;
// true

// run the constructor with new object as context
Person.call( firstPerson, 'Mud' );
// now it works 
firstPerson.greet();
// Hello, I am Mud

// The 'new' keyword is sugar to handle the above 
// before using, we have to set the prototypes explicitly
Person.prototype = basePerson;
Person.prototype.constructor = Person;
// now we can just use 'new'
var freshPerson = new Person( 'Mud Jr.' );
// what 'new' does: 
// clones FunctionBeingNewed.prototype into a new object
// passes new object to the function referenced by prototype.constructor, as 'this'
// returns the now-initialized new object
// Inheriting
function Student( name, subject ) {
  // 'this' refers to context when Student gets called
  Person.call( this, name );
  this.subject = subject;
}

// Clone the prototype
// This way property access looks up the chain
// But child property settings (on Student.prototype)
// don't affect parent prototype
Student.prototype = Object.create( Person.prototype );

Student.prototype.greet = function() {
  if ( this.canTalk ) {
    if ( this.subject ) {
      console.log( 'I am ' + this.name + ', studying ' + this.subject );
    } else {
      console.log( 'I am ' + this.name + ', a student without a subject' );
    }
  }
};
Student.prototype.constructor = Student;
// Note: when called via 'new', default return value of a constructor function
// is 'this' instead of undefined

var freshStudent = new Student( 'Jeremy', 'JavaScript' );
// Student { name: 'Jeremy', canTalk: true, subject: 'JavaScript' }
// anything set via 'this' shows up as a direct property
freshStudent.hasOwnProperty( 'canTalk' );
// true
// but not properties looked up via prototype chain
freshStudent.species;
// human
freshStudent.hasOwnProperty( 'species' );
// false

// FUNCTION DECLARATIONS VERSUS EXPRESSIONS
// a function can be declared by name 
// and then invoked by that name
function nameGoesHere( arg1, arg2 ) {
  // function body
  // this code is not executed until the function is invoked
  this.methodThatDoesntExist();
  // therefore this function declaration will not error
}
// function invocation
nameGoesHere();
// now methodThatDoesntExist will error (not a function)

// A function declaration becomes an expression when
// it is no longer a 'source element' - non-nested statement

// function declaration
function foo() {}

// function expression
var x = function hello() {};

// function expression
(function bar() {});

function blah() {        // source element - declaration
   var y = 20;           // source element
   function blerg() {}   // source element - declaration
   while (y == 10) {     // source element
      function gah() {}  // not a source element - expression
      y++;               // not a source element
   }
}

// Function expressions cannot be referenced by name
var x = function hello() {};
x();
// works
hello();
// error - not defined

// immediately invoked function expression (IIFE)
(function bar() {})();
// works
bar();
// error

// HOISTING
// Function and variable declarations (not expressions) 
// are parsed before expressions, assignments and invocations
// intuitive order:
function wrapper() {
  var a;
  function setA() {
    a = 10;
  }
  setA();
  return a;
}
// counterintuitive, but valid order:
function wrapper() {
  setA();
  function setA() {
    a = 10;
  }
  var a;
  return a;
}
// returns 10
// order statements are processed in:
// 1. declare function setA
// 2. declare variable a
// 3. invoke setA()
// 4. return a

// FUNCTION VARIABLE SCOPING
// Functions look up variables like objects look up properties
// A nested function can access variables declared above it
// But an outer function cannot access variables declared below
function wrapper() {
  var a = 5;

  function innerA() {
    var a = 10;
    return a;
  }

  console.log( a );
  console.log( innerA() );
  console.log( a );
  // prints 5, 10, 5

  function innerAB( dynamicValue ) {
    var a = dynamicValue;
    var b = 12;
    console.log( a );
    console.log( b );
    return a;
  }
  // nothing yet - hasn't been invoked
  innerAB( 11 );
  // prints 11, 12
  console.log( b );
  // error undefined - 'b' is not in scope
}

// CLOSURE
// When a function completes, its variables are garbage collected
// unless there's a reference to a inner variable from an outer scope
function makeCounter() {
  var counter = 0;
  return function() {
    counter++;
    console.log( counter );
  }
}
var ctr = makeCounter();
// no output - return value of makeCounter assigned to variable
ctr();
// 1
ctr();
// 2
ctr();
// 3
var anotherCtr = makeCounter();
anotherCtr();
// 1 - invoking makeCounter created a new scope, new instance of 'counter'
ctr();
// 4
anotherCtr();
// 2

function makeCounter() {
  var counter = counter || 0;
  return function() {
    counter++;
    console.log( counter );
  }
}
