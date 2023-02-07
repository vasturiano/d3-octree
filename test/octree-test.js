import assert from "assert";
import {octree} from "../src/index.js";

it("d3.octree() creates an empty octree", () => {
  const q = octree();
  assert(q instanceof octree);
  assert.strictEqual(q.visit(function() { throw new Error; }), q);
  assert.strictEqual(q.size(), 0);
  assert.strictEqual(q.extent(), undefined);
  assert.strictEqual(q.root(), undefined);
  assert.deepStrictEqual(q.data(), []);
});

it("d3.octree(nodes) is equivalent to d3.octree().addAll(nodes)", () => {
  const q = octree([[0, 0, 0], [1, 1, 1]]);
  assert(q instanceof octree);
  assert.deepStrictEqual(q.root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
});

it("d3.octree(nodes, x, y, z) is equivalent to d3.octree().x(x).y(y).z(z).addAll(nodes)", () => {
  const q = octree([{x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}], function(d) { return d.x; }, function(d) { return d.y; }, function(d) { return d.z; });
  assert(q instanceof octree);
  assert.deepStrictEqual(q.root(), [{data: {x: 0, y: 0, z: 0}},,,,,,, {data: {x: 1, y: 1, z: 1}}]);
});
