// primitive constructors return very similar things with or without 'new'
var newString = new String( 'yes' );
var noNewString = String( 'yes' );
// the big difference
typeof noNewString; // 'string'
typeof newString; // 'object'

// other constructors act very differently 
var newDate = new Date();
var noNewDate = Date();
typeof newDate; // 'object'
typeof noNewDate; // 'string'
newDate.getFullYear(); // 2016
noNewDate.getFullYear; // undefined

// 'new' creates a new instance
newDate instanceof Date; // true
noNewDate instanceof Date; // false
noNewDate instanceof String; // false
noNewDate instanceof Object; // false
newDate instanceof Object; // also true
