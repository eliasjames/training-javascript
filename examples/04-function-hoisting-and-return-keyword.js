// all function declarations are processed first
// before function execution
// this is referred to as 'hoisting'
// as if the definitions were 'hoisted' to the top
//
// opinions vary about whether to always declare functions at the top
// the important thing to understand is 
// declaration happens in a separate phase

function outer() {
  var test = 1;

  inner();
  function inner() {
    test = test + 1;
  }
  console.log( 'test equals 2: ', test );
}
outer(); // 'test equals 2: 2'

// independent of variable assignment
function outer() {
  var test;

  inner();
  function inner() {
    test = test + 1;
  }

  test = 1;
  inner();
  console.log( 'test equals 2: ', test );
}
outer(); // 'test equals 2: 2'

// return keyword stops processing and sends value back to calling function
function outer() {
  var test;

  inner();

  test = 1;
  return test; 

  // these lines never execute
  inner();
  console.log( 'test equals 2: ', test );

  // but declaration still does
  function inner() {
    test = test + 1;
  }
}
outer(); // returns 1 - the variable by itself

