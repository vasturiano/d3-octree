var tape = require("tape"),
    d3_octree = require("../");

tape("octree.data() returns an array of data in the octree", function(test) {
  var q = d3_octree.octree();
  test.deepEqual(q.data(), []);
  q.add([0, 0]).add([1, 2]);
  test.deepEqual(q.data(), [[0, 0], [1, 2]]);
  test.end();
});

tape("octree.data() correctly handles coincident nodes", function(test) {
  var q = d3_octree.octree();
  q.add([0, 0]).add([0, 0]);
  test.deepEqual(q.data(), [[0, 0], [0, 0]]);
  test.end();
});
