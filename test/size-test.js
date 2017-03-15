var tape = require("tape"),
    d3_octree = require("../");

tape("octree.size() returns the number of points in the octree", function(test) {
  var q = d3_octree.octree();
  test.equal(q.size(), 0);
  q.add([0, 0, 0]).add([1, 2, 3]);
  test.equal(q.size(), 2);
  test.end();
});

tape("octree.size() correctly counts coincident nodes", function(test) {
  var q = d3_octree.octree();
  q.add([0, 0, 0]).add([0, 0, 0]);
  test.equal(q.size(), 2);
  test.end();
});
