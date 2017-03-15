var tape = require("tape"),
    d3_octree = require("../");

tape("octree.z(z) sets the z-accessor used by octree.add", function(test) {
  var q = d3_octree.octree().z(z).add({0: 1, 1: 2, z: 3});
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {0: 1, 1: 2, z: 3}});
  test.end();
});

tape("octree.z(z) sets the z-accessor used by octree.addAll", function(test) {
  var q = d3_octree.octree().z(z).addAll([{0: 1, 1: 2, z: 3}]);
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {0: 1, 1: 2, z: 3}});
  test.end();
});

tape("octree.z(z) sets the z-accessor used by octree.remove", function(test) {
  var p0 = {0: 0, 1: 1, z: 2},
      p1 = {0: 1, 1: 2, z: 3},
      q = d3_octree.octree().z(z);
  test.deepEqual(q.add(p0).root(), {data: {0: 0, 1: 1, z: 2}});
  test.deepEqual(q.add(p1).root(), [{data: {0: 0, 1: 1, z: 2}},,,,,,, {data: {0: 1, 1: 2, z: 3}}]);
  test.deepEqual(q.remove(p1).root(), {data: {0: 0, 1: 1, z: 2}});
  test.equal(q.remove(p0).root(), undefined);
  test.end();
});

function z(d) {
  return d.z;
}
