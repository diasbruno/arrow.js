/*global module, require */

var daggy = require('daggy');
var tagged = daggy.tagged;
var Pair = require('fantasy-tuples').Tuple2;

// arr :: (b -> c) -> A b c
var Arrow = tagged('run');

/**
 * Contructor for 'applicative'.
 */
Arrow['of'] = Arrow;

/**
 * Compose the current arrow with a given.
 * next(Arrow a b) :: Arrow b c -> Arrow a c
 */
Arrow.prototype.next = function(b) {
  return Arrow.next(this, b);
};

/**
 * Compose two arrows and returns a new one.
 *
 * next :: Arrow a b -> Arrow b c -> Arrow a c
 */
Arrow.next = function(a, b) {
  return Arrow(function(v) {
    return b.run(a.run(v));
  });
};

/**
 * Given a pair, apply the arrow to the first element.
 *
 * first(Arrow a b) :: Arrow (a, c) (b, c)
 */
Arrow.prototype.first = function() {
  return Arrow.first(this);
};

/**
 * Given an arrow, returns another arrow that takes
 * a pair an apply to the first element of if.
 *
 * first :: Arrow a b -> Arrow (a, c) (b, c)
 */
Arrow.first = function(arr) {
  return Arrow(function(pair) {
    return Pair(arr.run(pair._1), pair._2);
  });
};

/**
 * Given a pair, apply the arrow to the secont element.
 *
 * second(Arrow a b) :: Arrow (a, b) (a, c)
 */
Arrow.prototype.second = function() {
  return Arrow.second(this);
};

/**
 * Given an arrow, returns another arrow that takes
 * a pair an apply to the second element of if.
 *
 * second :: Arrow a b -> Arrow (a, b) (a, c)
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
 *
 * bifur(Arrow a c) :: Arrow a c -> Arrow a (b, c)
 */
Arrow.prototype.bifur = function(b) {
  return Arrow.bifur(this, b);
};

/**
 * Take two arrows and return a pair where
 * the value is applied to each arrow.
 *
 * bifur' :: Arrow a b -> Arrow a c -> Arrow a (b, c)
 */
Arrow.bifur = function(a, b) {
  return Arrow(function(v) {
    return Pair(a.run(v), b.run(v));
  });
};

/**
 * Given a arrows, apply self arrow and the other
 * to an element of the pair.
 *
 * prod(Arrow a b) :: Arrow c d -> Arrow (a, c) (b, d)
 */
Arrow.prototype.prod = function(b) {
  return Arrow.prod(this, b);
};

/**
 * prod' :: Arrow a b -> Arrow c d -> Arrow (a, c) (b, d)
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

module.exports = Arrow;
