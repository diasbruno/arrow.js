var tagged = require('daggy').tagged;

// arr :: (b -> c) -> A b c
var Arrow = tagged('run');

/**
 * Contructor for 'applicative'.
 */
Arrow['of'] = Arrow;

/**
 * Compose the current arrow with a given.
 */
Arrow.prototype.next = function(b) {
  return Arrow.next(this, b);
};

/**
 * Compose two arrows and returns a new one.
 */
Arrow.next = function(a, b) {
  return Arrow(function(v) {
    return b.run(a.run(v));
  });
};

/**
 * Given a pair, apply the arrow to the first element.
 */
Arrow.prototype.first = function() {
  return Arrow.first(this);
};

/**
 * Given an arrow, returns another arrow that takes
 * a pair an apply to the first element of if.
 */
Arrow.first = function(arr) {
  return Arrow(function(pair) {
    return {
      a: arr.run(pair.a),
      b: pair.b
    };
  });
};

/**
 * Given a pair, apply the arrow to the secont element.
 */
Arrow.prototype.second = function() {
  return Arrow.second(this);
};

/**
 * Given an arrow, returns another arrow that takes
 * a pair an apply to the second element of if.
 */
Arrow.second = function(arr) {
  return Arrow(function(pair) {
    return {
      a: pair.a,
      b: arr.run(pair.b)
    };
  });
};

/**
 * Given a arrow, apply the the self arrow
 * to the first element of a pair and the next arrow
 * to the second element.
 */
Arrow.prototype.bifur = function(b) {
  return Arrow.bifur(this, b);
};

/**
 * Take two arrows and return a pair where
 * the value is applied to each arrow.
 */
Arrow.bifur = function(a, b) {
  return Arrow(function(v) {
    return {
      a: a.run(v),
      b: b.run(v)
    };
  });
};

/**
 * Given a arrows, apply self arrow and the other
 * to an element of the pair.
 */
Arrow.prototype.prod = function(b) {
  return Arrow.prod(this, b);
};

/**
 * Given two arrows, apply each arrow to an element of the pair.
 */
Arrow.prod = function(a, b) {
  return Arrow(function(pair) {
    return {
      a: a.run(pair.a),
      b: b.run(pair.b)
    };
  });
};

module.exports = Arrow;
