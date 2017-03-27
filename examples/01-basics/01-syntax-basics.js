// primitive literals
'string'; // single and double quotes are only different in JSON
5; // number
true; // boolean
undefined; 
null;

var myVariable; // returns undefined
myVariable = 'string'; // = is assignment operator

// function declaration
function myFunction( arg1, arg2 ) {
  return arguments;
} 
// note there is no semicolon on a function definition
// it is not an executable statement
// this will be meaningful later

// function execution
myFunction( 1, 2, 3 );
// returns [ 1, 2, 3 ];

// reference function definition by name
// note no parentheses at end
myFunction; // returns function definition
