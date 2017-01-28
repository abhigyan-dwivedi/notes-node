console.log("Hooked");

var square=(x) => {
  var result =x*x;
  return result
};

console.log(square(9))

var squareWithoutParan=x=>x*x;
console.log(squareWithoutParan(25));

var user={
  name:'Andrew',
  sayHi:()=>{
    //Arrow functions do not bind this keyword.
    //This returns the global arguments array
    console.log(arguments);
    console.log(`Hi. I am ${this.name}`)
  },
  //ES Syntax
  sayHiAlt(){
    console.log(arguments);
    console.log(`Hi. I am ${this.name}`)
  }
};
user.sayHi(1,2,3);
user.sayHiAlt();
user.name="Abhigyan";
user.sayHiAlt();

//Arguements array is an object with array like props
user.sayHiAlt(1,2,3);
