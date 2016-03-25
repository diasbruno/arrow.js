var tagged = require('daggy').tagged;
var Pair = require('fantasy-tuples').Tuple2;

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
    return Pair(arr.run(pair._1), pair._2);
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
    return Pair(pair._1, arr.run(pair._2));
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
    return Pair(a.run(v), b.run(v));
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
    return Pair(a.run(pair._1), b.run(pair._2));
  });
};

/**
 * Given a predicate and an arrow, if the predicate returns false,
 * execute the self arrow, otherwise, execute the other arrow.
 */
Arrow.prototype.branch = function(pred, arr) {
  return Arrow.branch(pred, this, arr);
};

/**
 * Given a predicate and tow arrows, if the predicate returns false,
 * execute the first arrow, otherwise, execute the other arrow.
 */
Arrow.branch = function(pred, arrA, arrB) {
  return Arrow(function(v) {
    return !pred(v) ? arrA.run(v) : arrB.run(v);
  });
};

module.exports = Arrow;
