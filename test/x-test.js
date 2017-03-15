var tape = require("tape"),
    d3_octree = require("../");

tape("octree.x(x) sets the x-accessor used by octree.add", function(test) {
  var q = d3_octree.octree().x(x).add({x: 1, 1: 2, 2: 3});
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {x: 1, 1: 2, 2: 3}});
  test.end();
});

tape("octree.x(x) sets the x-accessor used by octree.addAll", function(test) {
  var q = d3_octree.octree().x(x).addAll([{x: 1, 1: 2, 2: 3}]);
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {x: 1, 1: 2, 2: 3}});
  test.end();
});

tape("octree.x(x) sets the x-accessor used by octree.remove", function(test) {
  var p0 = {x: 0, 1: 1, 2: 2},
      p1 = {x: 1, 1: 2, 2: 3},
      q = d3_octree.octree().x(x);
  test.deepEqual(q.add(p0).root(), {data: {x: 0, 1: 1, 2: 2}});
  test.deepEqual(q.add(p1).root(), [{data: {x: 0, 1: 1, 2: 2}},,,,,,, {data: {x: 1, 1: 2, 2: 3}}]);
  test.deepEqual(q.remove(p1).root(), {data: {x: 0, 1: 1, 2: 2}});
  test.equal(q.remove(p0).root(), undefined);
  test.end();
});

function x(d) {
  return d.x;
}
