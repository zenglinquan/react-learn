/**
 * 基本数据类型存放在栈中，按值访问
 * Number、String、Boolean、Null、 Undefined、Symbol（ES6）
 */
console.log("--------基本数据类型----------")
var a = 10;
var b = a;
b = 20;
console.log(a, b)

/**
 * 引用类型存放在堆内存中，在栈中存放的是堆内存的地址指针值
 * Object（Array，Object，Set，Map，Function）
 */
console.log("---------引用类型---------")
var o = new Object();
var o1 = o;
o1.name = "我有名字了"
console.log(o.name)

//结合
console.log("--------[]----------")
var a = [1, 2, 3, 4, 5];
var b = a;//传值
var c = a[0];
console.log(b)
console.log(c)
b[4] = 6;
c = 7;
console.log(a[4])
console.log(a[0])
console.log(c)

/**
 * Object.assign({},对象),第一级属性深拷贝，以后级别属性浅拷贝
 */
console.log("--------Object.assign()----------")
let m = { name: { asd: '123' }, age: 18 }
let n = Object.assign({}, m)
n.name.asd = "456"
console.log(n)
console.log(m)
n.age = 19
n.name = "z"
console.log(n)
console.log(m)

/**
 * ES6中的...与object.assign()一样都是：第一级属性深拷贝，以后级别属性浅拷贝
 * JSON.parse(JSON.stringify(obj))：深拷贝常用方法
 */
console.log("---------...---------")
var obj = { a: 1, b: 2, c: { a: 3 }, d: [4, 5] }
var obj1 = obj
var obj2 = JSON.parse(JSON.stringify(obj))//深拷贝常用方法
var obj3 = { ...obj }
var obj4 = Object.assign({}, obj)
obj.a = 999
obj.c.a = -999
obj.d[0] = 123
console.log(obj1) //{a: 999, b: 2, c: { a: -999 },d: [123, 5]}
console.log(obj2) //{a: 1, b: 2, c: { a: 3 },d: [4, 5]}
console.log(obj3) //{a: 1, b: 2, c: { a: -999 },d: [123, 5]}
console.log(obj4) //{a: 1, b: 2, c: { a: -999 },d: [123, 5]}
console.log("--------JSON.parse(JSON.stringify())----------")
var arr = [1, 2, 3, [4, 5], { a: 6, b: 7 }]
var arr1 = JSON.parse(JSON.stringify(arr))//深拷贝常用方法
var arr2 = arr
var arr3 = [...arr]
var arr4 = Object.assign([], arr)
console.log(arr === arr1) //false
console.log(arr === arr2) //true
console.log(arr === arr3) //false
console.log(arr === arr4) //false
arr[0] = 999
arr[3][0] = -999
arr[4].a = 123
console.log(arr1) //[1, 2, 3, [4, 5], {a: 6, b: 7}]
console.log(arr2) //[999, 2, 3, [-999, 5], {a: 123, b: 7}]
console.log(arr3) //[1, 2, 3, [-999, 5], {a: 123, b: 7}]
console.log(arr4) //[1, 2, 3, [-999, 5], {a: 123, b: 7}]

/**
 * copy，只深拷贝了第一级的数值
 */
console.log("------copy-------")
var a = { key: "111" }
function copy(p) {
  var c = {};
  for (var i in p) {
    c[i] = p[i];
  }
  return c;
}
a.key2 = ["xiao", "xiao"] //引用类型是浅拷贝，结果相同
var b = copy(a)
b.key = "22" //数值部分是深拷贝，结果不同
b.key3 = "333";
b.key2.push("xiao")
console.log(a)
console.log(b)

/**
 * ES6实现只深拷贝第一级的方法
 */
//1: Object.assign()
console.log("------Object.assign()-------")
var a = { name: "暖风" }
var b = Object.assign({}, a);
b.age = 18;
b.name = "冷风";
console.log(a)
console.log(b)
console.log(a.age);//undefined

//2: 数组
console.log("------slice-------")
var a = [1, 2, 3];
var b = a.slice();
b.push(4);
console.log(a)//[ 1, 2, 3 ]
console.log(b)//[ 1, 2, 3, 4 ]
var a = [{ "k": [1, 2] }]
var b = a.slice();
b[0].k = [1, 2]
console.log(a)//[ { k: [ 1, 2 ] } ]
console.log(b)//[ { k: [ 1, 2 ] } ]

//3: concat
console.log("------concat-------")
var a = [1, 2, 3];
var b = a.concat();
b.push(4);
console.log(a)//[ 1, 2, 3 ]
console.log(b)//[ 1, 2, 3, 4 ]
var a = [{ "k": [1, 2] }]
var b = a.slice();
b[0].k = [1, 2]
console.log(a)//[ { k: [ 1, 2 ] } ]
console.log(b)//[ { k: [ 1, 2 ] } ]

//4 :...
console.log("-------...------")
var a = [1, 2, 3];
var b = [...a];
b.push(4)
console.log(a)//[ 1, 2, 3 ]
console.log(b)//[ 1, 2, 3, 4 ]
var a = [{ "k": [1, 2] }];
var b = [...a];
console.log(a)//[ { k: [ 1, 2 ] } ]
console.log(b)//[ { k: [ 1, 2 ] } ]

/**
 * 深拷贝实现方法
 */
console.log("-------_copy-------")
var a = { key1: "11111" }
function _copy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = (p[i].constructor === Array) ? [] : {}
      _copy(p[i], c[i]);
    } else {
      c[i] = p[i]
    }
  }
  return c;
}
a.key2 = ["小", "小"]
var b = {}
b = _copy(a, b);
b.key1 = "22"
b.key2.push("大");
console.log(a)
console.log(b)

// 深拷贝
console.log("-------lodash.cloneDeep()-------")
var objA = { "name": "戈德斯文" };
var objB =lodash.cloneDeep(objA);