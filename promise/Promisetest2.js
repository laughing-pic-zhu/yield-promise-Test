

new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(2333);
            }, 1000);
        }))
    }, 1000);
}).then(function (res) {
    return new Promise(function (resolve, reject) {
        console.log(res);
        setTimeout(function () {
            resolve(2333);
        }, 1000);
    })
}).then(function (res) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(4444);
        }, 1000);
    })
}).then(function (res) {
    console.log(res);
}).then(function (res) {
    console.log(res);
}).then(function (res) {
    console.log(res);
});

