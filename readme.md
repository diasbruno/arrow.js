arrowjs
=======

Arrow library for javascript inpired by haskell arrows and FRP.Yampa.

## Usage

- Arrow(f)

Given an function, it creates an arrow.

```javascript
function inc(val) {
  return v + 1;
}

Arrow(inc).run(1) == 2;
```

- Arrow.next(arrA, arrB)

Compose two arrows.

```javascript
function inc(v) {
  return v + 1;
}

function decr(v) {
  return v - 1;
}

Arrow(inc).next(Arrow(decr)).run(1) == Arrow.next(Arrow(inc), Arrow(decr)).run(1);
```

- Arrow.first(arr)

Given a tuple, it will run the arrow with the first element of the tuple.

```javascript
function inc(v) {
  return v + 1;
}

Arrow(inc).first().run({_1: 10, _2: 4}) == {_1: 11, _2: 4};
Arrow.first(Arr(inc)).run({_1: 10, _2: 4}) == {_1: 11, _2: 4};
```

- Arrow.second(arr)

Given a tuple, it will run the arrow with the second element of the tuple.

```javascript
function inc(v) {
  return v + 1;
}

Arrow(inc).second().run({_1: 10, _2: 4}) == {_1: 10, _2: 5};
Arrow.second(Arr(inc)).run({_1: 10, _2: 4}) == {_1: 10, _2: 5};
```

- Arrow.bifur(arrA, arrB)

Given two arrows, apply each arrow to a value and return a tuple.

```javascript
function inc(v) {
  return v + 1;
}

function decr(v) {
  return v - 1;
}

Arrow.bifur(Arrow(inc), Arrow(decr)).run(5) == {_1: 6, _2: 4};
```

- Arrow.prod(arrA, arrB)

Given two arrows, returns an arrow that receives a tuple and apply
each one to the correpondent in the tuple.

```javascript
function inc(v) {
  return v + 1;
}

function decr(v) {
  return v - 1;
}

Arrow.prod(Arrow(inc), Arrow(decr)).run({_1: 6, _2: 4}) == {_1: 7, _2: 3};
```
