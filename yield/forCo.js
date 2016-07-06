var co = require('co');
var fs = require('fs');
var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

var gen = function* () {
    var f1 = yield readFile('../file/a.txt');
    var f2 = yield readFile('../file/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
};

var g = gen();
co(gen).then(function (){
    console.log('Generator 函数执行完成');
});
//g.next().value.then(function (data) {
//    g.next(data).value.then(function (data) {
//        g.next(data);
//    });
//});

//g.next().value.then(function (data) {
//        return g.next(data).value;
//    }).then(function (data) {
//        return g.next(data).value;
//    });

//co(function* () {
//    var res = yield [
//        Promise.resolve(1),
//        Promise.resolve(2)
//    ];
//    console.log(res);
//}).catch(onerror);
//
