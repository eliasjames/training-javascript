// object literal
var myObj = {
  myKey: 'myValue',
  myNumber: 42,
  myMethod: function() {
    // when a function is a property of an object
    // 'this' keyword inside function body refers to the object
    return this.myKey;
  }
};
// property accessors - dot
myObj.myNumber; // returns 42
// property accessors - bracket
myObj['myNumber'] // same
// JSON === JavaScript Object Notation
JSON.stringify( myObj );
