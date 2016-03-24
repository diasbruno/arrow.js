var tagged = require('daggy').tagged;

// arr :: (b -> c) -> A b c
var Arrow = tagged('run');

Arrow['of'] = Arrow;

Arrow.prototype.next = function(b) {
  var s = this;
  return Arrow(function(v) {
    return b.run(s.run(v));
  });
};

Arrow.next = function(a, b) {
  return Arrow(function(v) {
    return b.run(a.run(v));
  });
};

Arrow.prototype.first = function(pair) {
  var s = this.run;
  return Arrow(function() {
    return {
      a: s(pair.a),
      b: pair.b
    };
  });
};

Arrow.first = function(arr) {
  return Arrow(function(pair) {
    return {
      a: arr.run(pair.a),
      b: pair.b
    };
  });
};

Arrow.prototype.second = function(arr) {
  var s = this.run;
  return Arrow(function(pair) {
    return {
      a: pair.a,
      b: s(pair.b)
    };
  });
};

Arrow.second = function(arr) {
  return Arrow(function(pair) {
    return {
      a: pair.a,
      b: arr.run(pair.b)
    };
  });
};

Arrow.prototype.bifur = function(b) {
  var s = this.run;
  return Arrow(function(v) {
    return {
      a: s(v),
      b: b.run(v)
    };
  });
};

Arrow.bifur = function(a, b) {
  return Arrow(function(v) {
    return {
      a: a.run(v),
      b: b.run(v)
    };
  });
};

Arrow.prototype.prod = function(b) {
  var s = this.run;
  return Arrow(function(pair) {
    return {
      a: s(pair.a),
      b: b.run(pair.b)
    };
  });
};

Arrow.prod = function(a, b) {
  return Arrow(function(pair) {
    return {
      a: a.run(pair.a),
      b: b.run(pair.b)
    };
  });
};

module.exports = Arrow;
