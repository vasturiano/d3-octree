var tape = require("tape"),
    d3_octree = require("../");

tape("octree.remove(datum) removes a point and returns the octree", function(test) {
  var p0 = [1, 1, 1],
      q = d3_octree.octree().add(p0);
  test.deepEqual(q.root(), {data: p0});
  test.equal(q.remove(p0), q);
  test.deepEqual(q.root(), undefined);
  test.end();
});

tape("octree.remove(datum) removes the only point in the octree", function(test) {
  var p0 = [1, 1, 1],
      q = d3_octree.octree().add(p0);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  test.deepEqual(q.root(), undefined);
  test.deepEqual(p0, [1, 1, 1]);
  test.end();
});

tape("octree.remove(datum) removes a first coincident point at the root in the octree", function(test) {
  var p0 = [1, 1, 1],
      p1 = [1, 1, 1],
      q = d3_octree.octree().addAll([p0, p1]);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  test.equal(q.root().data, p1);
  test.deepEqual(p0, [1, 1, 1]);
  test.deepEqual(p1, [1, 1, 1]);
  test.end();
});

tape("octree.remove(datum) removes another coincident point at the root in the octree", function(test) {
  var p0 = [1, 1, 1],
      p1 = [1, 1, 1],
      q = d3_octree.octree().addAll([p0, p1]);
  test.equal(q.remove(p1), q);
  test.deepEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  test.equal(q.root().data, p0);
  test.deepEqual(p0, [1, 1, 1]);
  test.deepEqual(p1, [1, 1, 1]);
  test.end();
});

tape("octree.remove(datum) removes a non-root point in the octree", function(test) {
  var p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q = d3_octree.octree().addAll([p0, p1]);
  test.equal(q.remove(p0), q);
  test.deepEqual(q.extent(), [[0, 0, 0], [2, 2, 2]]);
  test.equal(q.root().data, p1);
  test.deepEqual(p0, [0, 0, 0]);
  test.deepEqual(p1, [1, 1, 1]);
  test.end();
});

tape("octree.remove(datum) removes another non-root point in the octree", function(test) {
  var p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q = d3_octree.octree().addAll([p0, p1]);
  test.equal(q.remove(p1), q);
  test.deepEqual(q.extent(), [[0, 0, 0], [2, 2, 2]]);
  test.equal(q.root().data, p0);
  test.deepEqual(p0, [0, 0, 0]);
  test.deepEqual(p1, [1, 1, 1]);
  test.end();
});

tape("octree.remove(datum) ignores a point not in the octree", function(test) {
  var p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q0 = d3_octree.octree().add(p0),
      q1 = d3_octree.octree().add(p1);
  test.equal(q0.remove(p1), q0);
  test.deepEqual(q0.extent(), [[0, 0, 0], [1, 1, 1]]);
  test.equal(q0.root().data, p0);
  test.equal(q1.root().data, p1);
  test.end();
});

tape("octree.remove(datum) ignores a coincident point not in the octree", function(test) {
  var p0 = [0, 0, 0],
      p1 = [0, 0, 0],
      q0 = d3_octree.octree().add(p0),
      q1 = d3_octree.octree().add(p1);
  test.equal(q0.remove(p1), q0);
  test.deepEqual(q0.extent(), [[0, 0, 0], [1, 1, 1]]);
  test.equal(q0.root().data, p0);
  test.equal(q1.root().data, p1);
  test.end();
});

tape("octree.remove(datum) removes another point in the octree", function(test) {
  var q = d3_octree.octree()
      .extent([[0, 0, 0], [959, 959, 959]])
      .addAll([[630, 438, 438], [715, 464, 464], [523, 519, 519], [646, 318, 318], [434, 620, 620], [570, 489, 489], [520, 345, 345], [459, 443, 443], [346, 405, 405], [529, 444, 444]]);
  test.equal(q.remove(q.find(546, 440, 440)), q);
  test.deepEqual(q.extent(), [[0, 0, 0], [1024, 1024, 1024]]);
  test.deepEqual(q.root(), [
    [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [
        ,
        ,
        ,
        ,
        ,
        ,
        {data: [346, 405, 405]},
        {data: [459, 443, 443]}
      ]
    ],
    [
      ,
      ,
      ,
      ,
      ,
      ,
      [
        {data: [520, 345, 345]},
        {data: [646, 318, 318]},
        ,
        ,
        ,
        ,
        [
          ,
          {data: [630, 438, 438]},
          ,
          ,
          ,
          ,
          {data: [570, 489, 489]},

        ],
        {data: [715, 464, 464]}
      ],
    ],
    ,
    ,
    ,
    ,
    {data: [434, 620, 620]},
    {data: [523, 519, 519]}
  ]);
  test.end();
});
