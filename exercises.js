function sumOf() {
  var sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
};

function productOf() {
  var product = 1;
  for(var i = 0; i < arguments.length; i++) {
    product *= arguments[i];
  }
  return product;
};

function curriedSum(numArgs) {
  var numbers = [];
  function _curriedSum(arg) {
    numbers.push(arg);
    if (numbers.length === numArgs) {
      return sumOf.apply(null, numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function(numArgs) {
  var args = [];
  var that = this;
  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return that.apply(that, args);
    } else {
      return _curry;
    }
  }
  return _curry;
}