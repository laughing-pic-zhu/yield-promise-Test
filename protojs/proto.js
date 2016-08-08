function Person(){
    this.eye=2;
}
Person.prototype.air=2;
function Man(){

}

function Women(){

}

Man.prototype=Object.create(new Person());
Man.prototype.constructor=Man;
Women.prototype=new Person();
Women.prototype.constructor=Women;

var a=new Man();
var b=new Women();
console.log(a.air);
console.log(a.constructor);
console.log(b.air);

//var a = {a: 1};
// a ---> Object.prototype ---> null

//var b = Object.create(a);
//console.log(b.__proto__);


