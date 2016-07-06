var http = require('http');

function reqUrl(source,g){
    var options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/'+source,
        method: 'GET'
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(g.next().value);
        });
    });

    req.end();
}


function* main() {
    yield 'green';
    yield 'red';
    yield 'yellow';
}

var g = main();


function turn() {
    console.log(g.next().value);
}


turn();
setTimeout(turn, 2000);
setTimeout(turn, 4000);
