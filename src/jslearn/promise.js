const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  let self = this;
  this.status = PENDING;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status == PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onResolvedCallbacks.forEach(fn => fn(value))
    }
  }

  function reject(value) {
    if (self.status = PENDING) {
      self.status = REJECTED;
      self.value = value;
      self.onRejectedCallbacks.forEach(fn => fn(value))
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2;
  if (this.status == FULFILLED) {
    let x = onFulfilled(self.value)
    promise2 = new Promise((resolve, reject) => {
      resolve(x)
    })
  }
  if (this.status == REJECTED) {
    let x = onRejected(self.value);
    promise2 = new Promise((resolve, reject) => {
      reject(x)
    })
  }
  if (this.status == PENDING) {
    promise2 = new Promise((resolve, reject) => {
      self.onResolvedCallbacks.push(onFulfilled);
      self.onRejectedCallbacks.push(onRejected);
    })

  }
  return promise2;
}

Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => resolve(value))
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => reject(value))
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve);
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => { done(i, value) }, reject)
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.deferred = Promise.defer = function () {
  let defer = {}
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })
  return defer;
}

function gen(index, value) {
  let count = 0, result = [];
  return function (index, value) {
    result[i] = value;
    if (++count == index) resolve(result)
  }
}

module.exports = Promise

var promise = new Promise((resolve, reject) => {
  // resolve(123);
})

promise.then((res, err) => {
  console.log(res)
})

