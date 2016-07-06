function fib(){
    return {
        state :0,
        cur :0,
        prev1:-1,
        prev2:-1,
        hasNext:function(){
            return true;
        },
        //fib数列，第一个是0，第二个是1，后面就是统一的迭代公式了
        next:function(){
            if(this.state==0){
                this.cur = 0;
                this.state=1;
            }else if(this.state == 1){
                this.cur =1;
                this.prev2=0;
                this.state=2;
            }else{
                this.prev1 = this.prev2;
                this.prev2 =this.cur;
                this.cur = this.prev1+this.prev2;
            }
            return this.cur;
        }
        //ignore reset funciton
    }
}
//这是无限序列，所以改造了一下，只生成8个数
var fibIter = fib();
for(var i = 0;i<8;i++){
    console.log(fibIter.next());

}