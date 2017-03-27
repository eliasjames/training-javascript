var myObj = Object( { myKey: 'myVal' } );
// myObj has properties we didn't give it
myObj.length
myObj.toString();
// JS looks for properties on the prototype
myObj.__proto__.toString; // there it is
myObj.hasOwnProperty( 'toString' ); // false
myObj.__proto__.hasOwnProperty( 'toString' ); // true
myObj.__proto__.hasOwnProperty( 'hasOwnProperty' ); // true

// create a child 
var childObj = Object.create( myObj );
childObj.myKey; // 'myValue'
childObj.hasOwnProperty( 'myKey' ); // false
childObj.myKey = 'child value'; 
childObj.hasOwnProperty( 'myKey' ); // true 
// the child property is said to 'shadow' the parent
// prototypal lookup stops when it finds the first match
childObj.myKey; // 'child value' 
childObj.__proto__ === myObj; // true
// but not an instance
childObj instanceof myObj; // TypeError: Right-hand side  is not callable

function mySimpleChildMaker() {}
mySimpleChildMaker.prototype = myObj;
var nextChildObj = new mySimpleChildMaker();
nextChildObj.myKey; // 'myValue'
nextChildObj instanceof mySimpleChildMaker; // true
