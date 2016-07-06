'use strict';

var http = require('http');
var fs=require('fs');
var qs = require('querystring');
var users = {};

var projects=[];


var per_page=100;
var frequency=1;

function reqUrl(source, resolved, reject) {
    var options = {
        hostname: 'gitlab.alibaba-inc.com',
        path: source,
        method: 'GET'
    };
    var str = [];
    var req = http.request(options, res=> {
        res.setEncoding('utf8');
        res.on('data',  chunk=> {
            str.push(chunk);
        });

        res.on('end', () => {
            resolved(str.join(''));
        });

        res.on('error', error => {
            console.log(error);
            reject(source);
        });
    });
    req.end();
}

function getProjects(page) {
    var data = {
        private_token: 'N22MqwZ1hytQFXQXcD2g',
        per_page: per_page,
        page: page
    };
    var content = qs.stringify(data);
    var source='/api/v3/groups/5984/projects?'+content;
    new Promise((resolved, reject)=>{
        reqUrl(source,resolved, reject);
    }).then(res=>{
        var project=JSON.parse(res);
        projects=projects.concat(project);
        if (project.length<per_page) {
            for(var i=0;i<frequency;i++){
                getContributors();
            }
    }else{
                getProjects(page + 1);
        }
    });


}

function getContributors() {
    console.log(projects.length);
    if (projects.length>0) {
        var project = projects.pop();
        var data = {
            private_token: 'N22MqwZ1hytQFXQXcD2g'
        };
        var content = qs.stringify(data);
        var source = '/api/v3/projects/' + project.id + '/repository/contributors?' + content;

        new Promise((resolved, reject) =>{
            reqUrl(source, resolved, reject);
    }).then(res =>{
            getContributors();
            var contributors=JSON.parse(res);
            if(!Array.isArray(contributors)){
                console.log(contributors.message);
            }
            contributors.forEach(contributor =>{
            users[contributor.email] = users[contributor.email] || 0;
            users[contributor.email] += contributor.commits;
    });

    })

    }else{
        fs.writeFile('./data.json',JSON.stringify(users),error=>{
            console.log(error);
            process.exit();
        });

    }
}

getProjects(0);
