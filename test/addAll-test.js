var tape = require("tape"),
    d3_octree = require("../");

tape("octree.addAll(data) creates new points and adds them to the octree", function(test) {
  var q = d3_octree.octree();
  test.deepEqual(q.add([0, 0, 0]).root(), {data: [0, 0, 0]});
  test.deepEqual(q.add([1, 1, 1]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.add([1, 0, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]},,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.add([0, 1, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0]},,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.add([0, 0, 1]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0]},, {data: [0, 0, 1]},,, {data: [1, 1, 1]}]);
  test.deepEqual(q.add([0.4, 0.4, 0.4]).root(), [[{data: [0, 0, 0]},,,,,,, {data: [0.4, 0.4, 0.4]}], {data: [1, 0, 0]}, {data: [0, 1, 0]},, {data: [0, 0, 1]},,, {data: [1, 1, 1]}]);
  test.end();
});

tape("octree.addAll(data) ignores points with NaN coordinates", function(test) {
  var q = d3_octree.octree();
  test.deepEqual(q.addAll([[NaN, 0, 0], [0, NaN, 0], [0, 0, NaN]]).root(), undefined);
  test.equal(q.extent(), undefined);
  test.deepEqual(q.addAll([[0, 0, 0], [1, 1, 1]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.addAll([[NaN, 0, 0], [0, NaN, 0], [0, 0, NaN]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.extent(), [[0, 0, 0], [1, 1, 1]]);
  test.end();
});

tape("octree.addAll(data) correctly handles the empty array", function(test) {
  var q = d3_octree.octree();
  test.deepEqual(q.addAll([]).root(), undefined);
  test.equal(q.extent(), undefined);
  test.deepEqual(q.addAll([[0, 0, 0], [1, 1, 1]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.addAll([]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.deepEqual(q.extent(), [[0, 0, 0], [1, 1, 1]]);
  test.end();
});

tape("octree.addAll(data) computes the extent of the data before adding", function(test) {
  var q = d3_octree.octree().addAll([[0.4, 0.4, 0.4], [0, 0, 0], [1, 1, 1]]);
  test.deepEqual(q.root(), [[{data: [0, 0, 0]},,,,,,, {data: [0.4, 0.4, 0.4]}],,,,,,, {data: [1, 1, 1]}]);
  test.end();
});
