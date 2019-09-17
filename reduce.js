function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
function sum(a, b, c) {
  return a + b + c;
}
function reduce() {
  //checking for callback is skipped
  let i = 0, args = [];
  for(i = 0; i < arguments.length; i++){
      args.push(arguments[i]);
  }
  return (function(){//curry part
      let arr, val, i = 0;
      if(arguments.length == 3){
          arr = arguments[2];
          val = arguments[1];
      }else{
          return reduce.bind(null,...arguments);
      }
      for (i in arr) {
          val = args[0](+val || val, +arr[i] || arr[i], i, arr);//calling the callback with params
      }
      return val;
  }).apply(null, args);
}
function filter(filterFn, arr) {
  let re = [];
  reduce(function (a,b, index, array) {
      if (filterFn(b, index, array)) {
          re.push(b);
      }
      return b;
  }, [], arr);
  return re;
}
function map(mapFn, arr) {
  let re = [];
  reduce(function (a, b, index, array) {
      re.push(mapFn(b, index, array));
      return b;
  }, [], arr);
  return re;
}

function flat(depth, arr) {
  var re = [];
  while(depth > 0){
      re = [];
      reduce(function (a, b, index, array) {
          if(Array.isArray(b)){
              for(let e of b){
                  re.push(e);
              }
          }
          else{
              re.push(b);
          }
          return b;
      }, [], arr);
      arr = re;
      depth--;
  }
  return re;
}
function flatMap(callback, arr){
  let re = map(callback, arr);
  return flat(1, re);
}
var ref = reduce(function(a, b){
    return a+b;
  });
  console.log(ref([], [1,2,3,4]));//10
  var obj = [
  {
    "a": "ABC",
    "b": "name"
  },
  {
    "a": "XYZ",
    "b": "place"
  }
];
let curriedSum = curry(sum);
console.log(curriedSum(1,2,3));
console.log(curriedSum(1)(2,3));
console.log(curriedSum(1)(2)(3));
console.log(map(e => e**2, [1,2,3,4,5]));
console.log(filter(e => e < 4, [2,3, 4,5,6,6]));
console.log(flat( 5, [1,[2,[3,[4,[0,1,2],5],6]],7,[7,8],9,[[10,11]]]));
console.log(flatMap(e => [[e,e*2]], [2,3,4,5,7]));
var myreduce = reduce(
  function(a, b){
      if(a.indexOf(b.b) == -1){
          a.push(b.b);
      }
      return a;
  },
  [],
  obj
);
console.log(myreduce);