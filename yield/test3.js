function* dataConsumer() {
    console.log('Started');
    var aa=yield 1;
    yield;
    //console.log(`1. ${yield}`);
    //console.log(`2. ${yield}`);
    return 'result';
}

var genObj = dataConsumer();
console.log(genObj.next());
console.log(genObj.next('a'));

// 1. a
genObj.next('b');
// 2. b