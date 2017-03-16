var tape = require("tape"),
    d3_octree = require("../");

tape("octree.cover(x, y, z) sets a trivial extent if the extent was undefined", function(test) {
  test.deepEqual(d3_octree.octree().cover(1, 2, 3).extent(), [[1, 2, 3], [2, 3, 4]]);
  test.end();
});

tape("octree.cover(x, y, z) sets a non-trivial squarified and centered extent if the extent was trivial", function(test) {
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(1, 2, 2).extent(), [[0, 0, 0], [2, 2, 2]]);
  test.end();
});

tape("octree.cover(x, y, z) ignores invalid points", function(test) {
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(NaN, 2, 2).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.end();
});

tape("octree.cover(x, y, z) repeatedly doubles the existing extent if the extent was non-trivial", function(test) {
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, -1, -1).extent(), [[-2, -2, -2], [2, 2, 2]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(1, -1, 1).extent(), [[0, -2, 0], [4, 2, 4]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, -1, 1).extent(), [[0, -2, 0], [4, 2, 4]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 1, -1).extent(), [[0, 0, -2], [4, 4, 2]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 3, 3).extent(), [[0, 0, 0], [4, 4, 4]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(1, 3, 1).extent(), [[0, 0, 0], [4, 4, 4]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, 3, -1).extent(), [[-2, 0, -2], [2, 4, 2]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, 1, 1).extent(), [[-2, 0, 0], [2, 4, 4]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, -3, -3).extent(), [[-6, -6, -6], [2, 2, 2]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, -3, 3).extent(), [[0, -6, 0], [8, 2, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, -3, 1).extent(), [[0, -6, 0], [8, 2, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, 3, 5).extent(), [[0, 0, 0], [8, 8, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, 5, 5).extent(), [[0, 0, 0], [8, 8, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 5, 3).extent(), [[0, 0, 0], [8, 8, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, 5, 3).extent(), [[-6, 0, 0], [2, 8, 8]]);
  test.deepEqual(d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, 3, -3).extent(), [[-6, 0, -6], [2, 8, 2]]);
  test.end();
});

tape("octree.cover(x, y, z) repeatedly wraps the root node if it has children", function(test) {
  var q = d3_octree.octree().add([0, 0, 0]).add([2, 2, 2]);
  test.deepEqual(q.root(), [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]);
  test.deepEqual(q.copy().cover(3, 3, 3).root(), [[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,,, ]);
  test.deepEqual(q.copy().cover(-1, 3, 1).root(), [,[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,, ]);
  test.deepEqual(q.copy().cover(3, -1, 1).root(), [,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,, ]);
  test.deepEqual(q.copy().cover(-1, -1, -1).root(), [,,,,,,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]]);
  test.deepEqual(q.copy().cover(5, 5, 5).root(), [[[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,,, ],,,,,,, ]);
  test.deepEqual(q.copy().cover(-3, 5, 5).root(), [, [,[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,, ],,,,,, ]);
  test.deepEqual(q.copy().cover(5, -3, 5).root(), [,, [,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,, ],,,,, ]);
  test.deepEqual(q.copy().cover(-3, -3, -3).root(), [,,,,,,, [,,,,,,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]]]);
  test.end();
});

tape("octree.cover(x, y, z) does not wrap the root node if it is a leaf", function(test) {
  var q = d3_octree.octree().cover(0, 0, 0).add([2, 2, 2]);
  test.deepEqual(q.root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(3, 3, 3).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(-1, 3, -1).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(3, -1, 3).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(-1, -1, -1).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(5, 5, 5).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(-3, 5, 5).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(5, -3, -3).root(), {data: [2, 2, 2]});
  test.deepEqual(q.copy().cover(-3, -3, -3).root(), {data: [2, 2, 2]});
  test.end();
});

tape("octree.cover(x, y, z) does not wrap the root node if it is undefined", function(test) {
  var q = d3_octree.octree().cover(0, 0, 0).cover(2, 2, 2);
  test.equal(q.root(), undefined);
  test.equal(q.copy().cover(3, 3, 3).root(), undefined);
  test.equal(q.copy().cover(-1, 3, -1).root(), undefined);
  test.equal(q.copy().cover(3, -1, 3).root(), undefined);
  test.equal(q.copy().cover(-1, -1, -1).root(), undefined);
  test.equal(q.copy().cover(5, 5, 5).root(), undefined);
  test.equal(q.copy().cover(-3, 5, 5).root(), undefined);
  test.equal(q.copy().cover(5, -3, -3).root(), undefined);
  test.equal(q.copy().cover(-3, -3, -3).root(), undefined);
  test.end();
});
