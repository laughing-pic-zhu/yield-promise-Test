function* test(p){
    console.log(p); // 1
    var a = yield p + 1;
    console.log(a); // 3
}

var g = test(1);
var ret;
ret = g.next();
console.log(ret); // { value: 2, done: false }
ret = g.next(ret.value + 1);
console.log(ret); // { value: undefined, done: true }