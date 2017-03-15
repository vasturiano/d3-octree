var tape = require("tape"),
    d3_octree = require("../");

tape("d3.octree() creates an empty octree", function(test) {
  var q = d3_octree.octree();
  test.ok(q instanceof d3_octree.octree);
  test.equal(q.visit(function(node, x0, y0, z0, x1, y1, z1) { throw new Error; }), q);
  test.equal(q.size(), 0);
  test.equal(q.extent(), undefined);
  test.equal(q.root(), undefined);
  test.deepEqual(q.data(), []);
  test.end();
});

tape("d3.octree(nodes) is equivalent to d3.octree().addAll(nodes)", function(test) {
  var q = d3_octree.octree([[0, 0, 0], [1, 1, 1]]);
  test.ok(q instanceof d3_octree.octree);
  test.deepEqual(q.root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  test.end();
});

tape("d3.octree(nodes, x, y, z) is equivalent to d3.octree().x(x).y(y).z(z).addAll(nodes)", function(test) {
  var q = d3_octree.octree([{x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}], function(d) { return d.x; }, function(d) { return d.y; }, function(d) { return d.z; });
  test.ok(q instanceof d3_octree.octree);
  test.deepEqual(q.root(), [{data: {x: 0, y: 0, z: 0}},,,,,,, {data: {x: 1, y: 1, z: 1}}]);
  test.end();
});
