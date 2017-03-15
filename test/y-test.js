var tape = require("tape"),
    d3_octree = require("../");

tape("octree.y(y) sets the y-accessor used by octree.add", function(test) {
  var q = d3_octree.octree().y(y).add({0: 1, y: 2, 2: 3});
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {0: 1, y: 2, 2: 3}});
  test.end();
});

tape("octree.y(y) sets the y-accessor used by octree.addAll", function(test) {
  var q = d3_octree.octree().y(y).addAll([{0: 1, y: 2, 2: 3}]);
  test.deepEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  test.deepEqual(q.root(), {data: {0: 1, y: 2, 2: 3}});
  test.end();
});

tape("octree.y(y) sets the y-accessor used by octree.remove", function(test) {
  var p0 = {0: 0, y: 1, 2: 2},
      p1 = {0: 1, y: 2, 2: 3},
      q = d3_octree.octree().y(y);
  test.deepEqual(q.add(p0).root(), {data: {0: 0, y: 1, 2: 2}});
  test.deepEqual(q.add(p1).root(), [{data: {0: 0, y: 1, 2: 2}},,,,,,, {data: {0: 1, y: 2, 2: 3}}]);
  test.deepEqual(q.remove(p1).root(), {data: {0: 0, y: 1, 2: 2}});
  test.equal(q.remove(p0).root(), undefined);
  test.end();
});

function y(d) {
  return d.y;
}
