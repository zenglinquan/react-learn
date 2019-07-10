// var num = Number(1)
// var num1 = new Number(1)
// console.log(typeof num)
// console.log(num instanceof Number)
// console.log(num instanceof Object)
// console.log("------")
// console.log(typeof num1)
// console.log(num1 instanceof Number)
// console.log(num1 instanceof Object)

// console.log('------')
// var num2 = new Number()
// var o = {}; o.__proto__ = Number.prototype; Number.call(o);
// console.log(typeof num2)
// console.log(typeof o)

/**
 * 仿写new
 */

function Student(name, age) {
  this.name = name;
  this.age = age;
}

function _new() {
  console.log(arguments)
  console.log(...arguments)
  console.log('---------------')
  let args = [...arguments];
  console.log(args, "args")
  console.log(args instanceof Array)
  console.log(args.slice(1))
  console.log(...args.slice(1))
  let constructor = args[0];
  let obj = Object.create(constructor.prototype);
  let res = constructor.call(obj, ...args.slice(1))
  if ((typeof res == 'object' || typeof res == 'function') && res != null) {
    return res;
  } else {
    return obj;
  }
}

let s = new Student("z", 18)
let _s = _new(Student, 'l', 19)
console.log(s)
console.log(typeof s)
console.log('-------')
console.log(_s)
console.log(typeof _s)

