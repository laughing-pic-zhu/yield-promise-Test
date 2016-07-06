var fs=require('fs');

var readFile=function(fileName){
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,(err,data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    })
});
};

function* gen(){
    var r1=yield readFile('../file/a.txt');
    console.log(r1.toString());
    var r2=yield readFile('../file/b.txt');
    console.log(r2.toString());
}


function co(gen){
    return new Promise((resolve,reject)=>{
            var g=gen();
            var r=g.next();
            var next=function(t){
                console.log(t);
                if(t.done){
                    resolve();
                    return;
                }
                t.value.then(data=>{
                var t1=g.next(data);
                next(t1);
            });
            };

            next(r);
        });

}

co(gen).then(data=>{
    console.log('over');
});




