var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise(callback) {
    this.status = PENDING;
    this.value = null;
    this.handles = [];
    setTimeout(callback.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
}

Promise.prototype = {
    constructor: Promise,

    resolve: function (result) {
        this.status = FULFILLED;
        this.value = result;
        this.done();
    },

    reject: function (error) {
        this.status = REJECTED;
        this.value = error;
    },

    done:function(){
        var that=this;
        this.handles.forEach(function(handle){
            that.handle(handle);
        })
    },

    handle:function(handle){
        handle.bind(this)(this.value);
    },

    then:function(success,fail){
        this.handles.push(success);
        return this;
    }
};

new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2);
    }, 1000);
}).then(function (res) {
    console.log(res);
}).then(function (res) {
    console.log(res);
}).then(function (res) {
    console.log(res);
});