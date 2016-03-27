var should = require('should');

var arr = require('../arrow.js');
var Pair = require('fantasy-tuples').Tuple2;


function id(x)    { return x;             }
function inc(x)   { return x + 1;         }
function dbl(x)   { return x * 2;         }
function decr(x)  { return x - 1;         }
function dupl(x)  { return Pair(x, x);    }
function label(c) { return "label: " + c; }

describe("arrow.js", function() {
  it("Arrow(f)", function() {
    arr(id).
      run(1).should.be.eql(1);
  });

  it("Arrow#lift(f)", function() {
    arr(id).
      run(1).should.be.eql(1);
  });

  it("Arrow#next(arr, arr)", function() {
    arr.next(arr(id), arr(inc)).
      run(1).should.be.eql(2);
  });

  it("#next(arr)", function() {
    arr(id).next(arr(inc)).
      run(1).should.be.eql(2);
  });

  it("Arrow#first(arr)", function() {
    arr.first(arr(inc)).
      run(Pair(1, 1)).should.be.eql(Pair(2, 1));
  });

  it("#first(arr)", function() {
    arr(inc).first().
      run(Pair(1, 1)).should.be.eql(Pair(2, 1));
  });

  it("Arrow#second(arr)", function() {
    arr.second(arr(inc)).
      run(Pair(1, 1)).should.be.eql(Pair(1, 2));
  });

  it("#second(arr)", function() {
    arr(inc).second().
      run(Pair(1, 1)).should.be.eql(Pair(1, 2));
  });

  it("Arrow#bifur(arrA, arrB)", function() {
    arr.bifur(arr(label), arr(inc)).
      run(1).should.be.eql(Pair("label: 1", 2));
  });

  it("#bifur(arrB)", function() {
    arr(label).bifur(arr(inc)).
      run(1).should.be.eql(Pair("label: 1", 2));
  });

  it("Arrow#prod(arrA, arrB)", function() {
    arr.prod(arr(label), arr(inc)).
      run(Pair(1, 2)).should.be.eql(Pair("label: 1", 3));
  });

  it("#prod(arrA, arrB)", function() {
    arr(label).prod(arr(inc)).
      run(Pair(1, 1)).should.be.eql(Pair("label: 1", 2));
  });

  it("calc 2 * 2 - 1", function() {
    arr.next(arr(dbl),arr(decr)).
      run(2).should.be.eql(3);
  });
});
