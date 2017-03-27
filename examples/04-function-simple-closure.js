function manualCounter() {
  var ctr = 0;
  return {
    incrementctr: function() {
      ctr++;
      return true;
    },
    getctr: function() {
      return ctr;
    }
  }
}
var hasARefToCtr = manualCounter();
// as long as hasARefToCtr exists, 
// ctr will never be garbage collected
// get rid of variables is easy:
hasARefToCtr = null;
