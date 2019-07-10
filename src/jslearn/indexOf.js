function isContain(a, b) {
  for (var i = 0; i < b.length; i++) {
    let child = '';
    for (var j = i; j < a.length + i; j++) {
      child += b[j];
    }
    if (child == a){
      return i;
    }
  }
  return -1;
}
var a = isContain("13","2134")
var a = isContain("355","01343509355")
console.log(a)