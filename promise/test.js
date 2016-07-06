var http = require('http');

function reqUrl(source,resolved,reject){
    var options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/'+source,
        method: 'GET'
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            resolved(chunk);
        });
    });

    req.end();
}


function turn(source){
    return new Promise((resolved,reject)=>{
            setTimeout(reqUrl,3000,source,resolved,reject)
    })
}


turn('a.txt').then((value)=>{
    console.log(value);
    return turn(value);
}).then((value)=>{
    console.log(value);
    return turn(value);
})
