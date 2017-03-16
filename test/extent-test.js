var tape = require("tape"),
    d3_octree = require("../");

tape("octree.extent(extent) extends the extent", function(test) {
  test.deepEqual(d3_octree.octree().extent([[0, 1, 2], [2, 6, 4]]).extent(), [[0, 1, 2], [8, 9, 10]]);
  test.end();
});

tape("octree.extent() can be inferred by octree.cover", function(test) {
  var q = d3_octree.octree();
  test.deepEqual(q.cover(0, 0, 0).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.deepEqual(q.cover(2, 4, 6).extent(), [[0, 0, 0], [8, 8, 8]]);
  test.end();
});

tape("octree.extent() can be inferred by octree.add", function(test) {
  var q = d3_octree.octree();
  q.add([0, 0, 0]);
  test.deepEqual(q.extent(), [[0, 0, 0], [1, 1, 1]]);
  q.add([2, 4, 6]);
  test.deepEqual(q.extent(), [[0, 0, 0], [8, 8, 8]]);
  test.end();
});

tape("octree.extent(extent) squarifies and centers the specified extent", function(test) {
  test.deepEqual(d3_octree.octree().extent([[0, 1, 2], [2, 6, 4]]).extent(), [[0, 1, 2], [8, 9, 10]]);
  test.end();
});

tape("octree.extent(extent) ignores invalid extents", function(test) {
  test.equal(d3_octree.octree().extent([[1, NaN, 1], [NaN, 0, 1], [0, 0, NaN]]).extent(), undefined);
  test.equal(d3_octree.octree().extent([[NaN, 1, 1], [0, NaN, 1], , [0, 0, NaN]]).extent(), undefined);
  test.equal(d3_octree.octree().extent([[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]]).extent(), undefined);
  test.end();
});

tape("octree.extent(extent) flips inverted extents", function(test) {
  test.deepEqual(d3_octree.octree().extent([[1, 1, 1], [0, 0, 0]]).extent(), [[0, 0, 0], [2, 2, 2]]);
  test.end();
});

tape("octree.extent(extent) tolerates partially-valid extents", function(test) {
  test.deepEqual(d3_octree.octree().extent([[NaN, 0, 0], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  test.deepEqual(d3_octree.octree().extent([[0, NaN, 0], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  test.deepEqual(d3_octree.octree().extent([[0, 0, NaN], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  test.deepEqual(d3_octree.octree().extent([[0, 0, 0], [NaN, 1, 1]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.deepEqual(d3_octree.octree().extent([[0, 0, 0], [1, NaN, 1]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.deepEqual(d3_octree.octree().extent([[0, 0, 0], [1, 1, NaN]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.end();
});

tape("octree.extent(extent) allows trivial extents", function(test) {
  test.deepEqual(d3_octree.octree().extent([[0, 0, 0], [0, 0, 0]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  test.deepEqual(d3_octree.octree().extent([[1, 1, 1], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  test.end();
});
