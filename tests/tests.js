/*global describe, it, require */

var should = require('should');

var Arrow = require('../arrow.js');
var Pair = require('fantasy-tuples').Tuple2;

function id(x)    { return x;             }
function inc(x)   { return x + 1;         }
function dbl(x)   { return x * 2;         }
function decr(x)  { return x - 1;         }
function dupl(x)  { return Pair(x, x);    }
function label(c) { return "label: " + c; }

describe("arrow.js", function() {
  it("Arrow(f)", function() {
   Arrow(id).
      run(1).should.be.eql(1);
  });

  it("Arrow#lift(f)", function() {
    Arrow(id).
      run(1).should.be.eql(1);
  });

  it("Arrow#next(arr, arr)", function() {
    Arrow.next(Arrow(id), Arrow(inc)).
      run(1).should.be.eql(2);
  });

  it("#next(arr)", function() {
    Arrow(id).next(Arrow(inc)).
      run(1).should.be.eql(2);
  });

  it("Arrow#first(arr)", function() {
    Arrow.first(Arrow(inc)).
      run(Pair(1, 1)).should.be.eql(Pair(2, 1));
  });

  it("#first(arr)", function() {
    Arrow(inc).first().
      run(Pair(1, 1)).should.be.eql(Pair(2, 1));
  });

  it("Arrow#second(arr)", function() {
    Arrow.second(Arrow(inc)).
      run(Pair(1, 1)).should.be.eql(Pair(1, 2));
  });

  it("#second(arr)", function() {
    Arrow(inc).second().
      run(Pair(1, 1)).should.be.eql(Pair(1, 2));
  });

  it("Arrow#bifur(arrA, arrB)", function() {
    Arrow.bifur(Arrow(label), Arrow(inc)).
      run(1).should.be.eql(Pair("label: 1", 2));
  });

  it("#bifur(arrB)", function() {
    Arrow(label).bifur(Arrow(inc)).
      run(1).should.be.eql(Pair("label: 1", 2));
  });

  it("Arrow#prod(arrA, arrB)", function() {
    Arrow.prod(Arrow(label), Arrow(inc)).
      run(Pair(1, 2)).should.be.eql(Pair("label: 1", 3));
  });

  it("#prod(arrA, arrB)", function() {
    Arrow(label).prod(Arrow(inc)).
      run(Pair(1, 1)).should.be.eql(Pair("label: 1", 2));
  });

  it("calc 2 * 2 - 1", function() {
    Arrow.next(Arrow(dbl), Arrow(decr)).
      run(2).should.be.eql(3);
  });
});
