var arr = require('../arrow.js');
var should = require('should');

function id(x) { return x; }
function inc(x) { return x + 1; }
function dupl(x) {
  return {
    a: x,
    b: x
  };
}

describe("arrow.js", function() {
  it("Arrow(f)", function() {
    arr(id).run(1).should.be.eql(1);
  });

  it("Arrow#lift(f)", function() {
    arr.lift(id).run(1).should.be.eql(1);
  });

  it("Arrow#next(arr, arr)", function() {
    arr.next(
      arr.lift(id),
      arr.lift(inc)
    ).run(1).should.be.eql(2);
  });

  it("#next(arr)", function() {
    arr.lift(id).next(arr.lift(inc)).
      run(1).should.be.eql(2);
  });

  it("Arrow#first(arr)", function() {
    arr.first(arr.lift(inc)).
      run({a: 1, b: 1}).should.be.eql({a: 2, b: 1});
  });

  it("#first(arr)", function() {
    arr.lift(inc).first({a: 1, b: 1}).
      run().should.be.eql({a: 2, b: 1});
  });

  it("Arrow#second(arr)", function() {
    arr.second(arr.lift(inc)).
      run({a: 1, b: 1}).should.be.eql({a: 1, b: 2});
  });
  
  it("#second(arr)", function() {
    arr.lift(inc).second().
      run({a: 1, b: 1}).should.be.eql({a: 1, b: 2});
  });

  it("Arrow#bifur(arrA, arrB)", function() {
    arr.bifur(
      arr.lift(function(c) { return "label: " + c; }),
      arr.lift(inc)
    ).run(1).should.be.eql({a: "label: 1",  b: 2});
  });

  it("#bifur(arrB)", function() {
    arr.lift(function(c) { return "label: " + c; }).
      bifur(arr.lift(inc)).run(1).should.be.eql({a: "label: 1",  b: 2});
  });
});
