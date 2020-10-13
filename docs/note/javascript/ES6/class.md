# class

::: tip
ES6 class
:::

静态属性、原型属性、实例属性
```js
class Xinclass{
    constructor(){
        this.type = '动物'  //实例上的属性
    }
    //a = 1  // es7   实例上的属性
    get a(){    //原型上的属性
        return 10;
    }
    exa(){      //原型上的方法
        console.log('exa');
    }
    static add(){  //静态方法 (类上的方法)
        return 'add';
    }
    static get flag(){  //静态属性 (类上的属性)
        return 20;
    }
}
let aa = new Xinclass;
//hasOwnProperty  返回一个布尔值,指示对象自身属性中是否具有某个指定的属性,原型属性返回false
console.log(aa.hasOwnProperty('a'));    //false
console.log(Xinclass.add);
```

### 类的继承
ES5类的继承
```js
function add(){
    if(new.target === add){
        throw new Error('不能被new')
    }
    this.type = 'll';
}
add.prototype.ert = function (){
    console.log('ert')
}
// let a = new add(); //报错
function ss(){
    add.call(this); //继承add的构造函数
}
// ss.prototype.__proto__ = add.prototype;
// es6写法  效果同上句代码
Object.setPrototypeOf(ss.prototype,add.prototype);
let s = new ss;
console.log(s)
s.ert();

```
***

```js
class Flyer{
    static falg(){
        return this.aa; //this 永远指向 .前的对象
    }
    constructor(fname,speed){
        this.fname = fname;
        this.speed = speed;
        this.type = '动物';
    }
    fly(){
        console.log(`${this.fname}以时速${this.speed}飞行`);
    }
    eat(){
        console.log('eat')
    }
}
class Plane extends Flyer{      //Plane继承Flyer的原型对象
    static get aa(){
        return 'll'
    }
    constructor(fname,speed,score){
        super(fname,speed);     //super指向父类的constructor方法 (实例)，super调用（相当于继承）Flyer的构造函数
        this.score=score;
    }
    static add(){
        return super.falg()   //静态方法中的super指向的是父类本身（静态）  只能获取父类中的静态属性
    }
    getScore(){
        console.log(`击落${this.fname}得${this.score}分`)
    }
    eat(){      //类的重写  可以覆盖 父类原型上的eat方法
        console.log('zi-eat')
        // super.eat();    //super指向父类的原型 (原型) 这里可以调用父类的原型
    }

}
console.log(Plane.add());
var f22 = new Plane("F22",1000,5);
console.log(f22);
// f22.fly();
// f22.getScore();
f22.eat();
```