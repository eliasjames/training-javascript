// extend the constructor to a subtype (mixin)
// this example requires Person() from function-context
var teacherProto = {
  occupation: 'Teacher'
};

function Teacher( name, subject ) {
  var newPerson = new Person( name );
  newPerson.subject = subject;
  newPerson.occupation = this.occupation;
  newPerson.greet = teacherGreeting.bind( newPerson );
  // don't declare anonymous functions inside constructors
  // otherwise every instance gets its own anonymous function
  newPerson.editGreet = changeSubject;
  return newPerson;
}
function teacherGreeting() {
  return 'Hello, my name is ' + this.name + 
    '. I am a ' + this.occupation + 
    ' and I teach ' + this.subject;
}
function changeSubject( newSubj ) {
  if ( newSubj.length > 3 ) {
    thisReference.subject = newSubj;
  }
}
Teacher.prototype = teacherProto;

var tcrElias = new Teacher( 'Elias', 'JavaScript' );
tcrElias.greet();
tcrElias.changeSubject( 'AngularJS' );
tcrElias.greet();

// var statements inside nested functions shadow variable lookup
// similar to how child properties shadow parents
// (although variable scope and prototype properties are otherwise unrelated)
function ShadowTeacher( name, subject ) {
  var newPerson = new Person( name );
  newPerson.subject = subject;
  newPerson.occupation = this.occupation;
  newPerson.greet = teacherGreeting.bind( this );
  // same except here
  newPerson.editGreet = changeSubjectShadow;
  return newPerson;
}
function changeSubjectShadow( newSubj ) {
  var thisReference = { subject: 'no' };
  // teacherGreeting still works, but the message will never change
  // because it's changeSubjectShadow's var thisReference getting assigned below
  if ( newSubj.length > 3 ) {
    thisReference.subject = newSubj;
  }
}
ShadowTeacher.prototype = teacherProto; // proto didn't change
var shdElias = new ShadowTeacher( 'Elias', 'JavaScript' );
shdElias.greet();
shdElias.editGreet( 'AngularJS' );
shdElias.greet();
