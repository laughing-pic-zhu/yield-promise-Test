function* fib2() {
    yield 0;//状态0，第一次调用next，返回0，并改变状态
    yield 1;//状态1，第二次调用next，返回1，并改变状态
    var p1 = 0
        , p2 = 1
        , cur = p1 + p2;
    while (true) {
        yield cur;//状态2，后面调用next，返回相应的几个，状态不在改变
        p1 = p2;
        p2 = cur;
        cur = p1 + p2;
    }
}

var fibIter2 = fib2();
for (var i = 0; i < 8; i++) {
    console.log(fibIter2.next().value);
}