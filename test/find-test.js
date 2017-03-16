var tape = require("tape"),
    d3_array = require("d3-array"),
    d3_octree = require("../");

tape("octree.find(x, y, z) returns the closest point to the given [x, y, z]", function(test) {
  var dx = 17,
      dy = 17,
      dz = 17,
      q = d3_octree.octree();
  d3_array.range(dx * dy * dz).forEach(function(i) { q.add([i % dx, (i / dx) % dx | 0,  (i / dx / dx) % dx | 0]); });
  test.deepEqual(q.find( 0.1,  0.1,  0.1), [ 0,  0,  0]);
  test.deepEqual(q.find( 7.1,  7.1,  7.1), [ 7,  7,  7]);
  test.deepEqual(q.find( 0.1, 15.9,  7.1), [ 0, 16,  7]);
  test.deepEqual(q.find( 0.1, 7.1,  15.9), [ 0, 7,  16]);
  test.deepEqual(q.find(15.9, 15.9, 15.9), [16, 16, 16]);
  test.end();
});

tape("octree.find(x, y, z, radius) returns the closest point within the search radius to the given [x, y, z]", function(test) {
  var q = d3_octree.octree([[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  test.deepEqual(q.find(20, 20, 20, Infinity), [0, 0, 0]);

  test.deepEqual(q.find(20, 20, 20, 20 * Math.sqrt(3) + 1e-6), [0, 0, 0]);
  test.equal(q.find(20, 20, 20, 20 * Math.sqrt(3) - 1e-6), undefined);

  test.deepEqual(q.find(0, 20, 20, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  test.equal(q.find(0, 20, 20, 20 * Math.SQRT2 - 1e-6), undefined);
  test.deepEqual(q.find(20, 0, 20, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  test.equal(q.find(20, 0, 20, 20 * Math.SQRT2 - 1e-6), undefined);
  test.deepEqual(q.find(20, 20, 0, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  test.equal(q.find(20, 20, 0, 20 * Math.SQRT2 - 1e-6), undefined);

  test.deepEqual(q.find(20, 0, 0, 20 + 1e-6), [0, 0, 0]);
  test.equal(q.find(20, 0, 0, 20 - 1e-6), undefined);
  test.deepEqual(q.find(0, 20, 0, 20 + 1e-6), [0, 0, 0]);
  test.equal(q.find(0, 20, 0, 20 - 1e-6), undefined);
  test.deepEqual(q.find(0, 0, 20, 20 + 1e-6), [0, 0, 0]);
  test.equal(q.find(0, 0, 20, 20 - 1e-6), undefined);
  test.end();
});

tape("octree.find(x, y, z, null) treats the given radius as Infinity", function(test) {
  var q = d3_octree.octree([[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  test.deepEqual(q.find(20, 20, 20, null), [0, 0, 0]);
  test.deepEqual(q.find(20, 20, 20, undefined), [0, 0, 0]);
  test.end();
});
