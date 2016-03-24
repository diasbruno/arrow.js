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
    arr(id).run(1).should.be.eql(1);
  });

  it("Arrow#next(arr, arr)", function() {
    arr.next(
      arr(id),
      arr(inc)
    ).run(1).should.be.eql(2);
  });

  it("#next(arr)", function() {
    arr(id).next(arr(inc)).
      run(1).should.be.eql(2);
  });

  it("Arrow#first(arr)", function() {
    arr.first(arr(inc)).
      run({a: 1, b: 1}).should.be.eql({a: 2, b: 1});
  });

  it("#first(arr)", function() {
    arr(inc).first({a: 1, b: 1}).
      run().should.be.eql({a: 2, b: 1});
  });

  it("Arrow#second(arr)", function() {
    arr.second(arr(inc)).
      run({a: 1, b: 1}).should.be.eql({a: 1, b: 2});
  });
  
  it("#second(arr)", function() {
    arr(inc).second().
      run({a: 1, b: 1}).should.be.eql({a: 1, b: 2});
  });

  it("Arrow#bifur(arrA, arrB)", function() {
    arr.bifur(
      arr(function(c) { return "label: " + c; }),
      arr(inc)
    ).run(1).should.be.eql({a: "label: 1",  b: 2});
  });

  it("#bifur(arrB)", function() {
    arr(function(c) { return "label: " + c; }).
      bifur(arr(inc)).run(1).should.be.eql({a: "label: 1",  b: 2});
  });
});
