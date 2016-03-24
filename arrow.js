
// arr :: (b -> c) -> A b c
function Arrow(f) {
  if (!(this instanceof Arrow)) {
    return new Arrow(f);
  }

  this.f = function(v) {
    return f(v);
  };

  return this;
}

Arrow.prototype.run = function(v) {
  return this.f(v);
};

Arrow.prototype.lift = function(f) {
  return Arrow(f);
};

Arrow.lift = function(f) {
  return Arrow(f);
};

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
  var s = this.f;
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
  var s = this.f;
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
  var s = this.f;
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

module.exports = Arrow;
