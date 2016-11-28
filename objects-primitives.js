// primitives are not objects 
// don't have properties, or therefore methods
42.length; // syntax error

// but wait - this works?!?!
'arbitrary phrase'.length

// JS is 'boxing' the primitive - wrapping it in a corresponding object constructor
( 42 ).length; // undefined, but no syntax error
( String( 'arbitrary phrase')).length; // this is what's really happening above

// everything that's not a primitive is an object
function myFuncIsObj() {}
myFuncIsObj.someProperty = 'some value'; // legal
