import assert from "assert";
import {octree} from "../src/index.js";

it("octree.z(z) sets the z-accessor used by octree.add", () => {
  const q = octree().z(z).add({0: 1, 1: 2, z: 3});
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, 1: 2, z: 3}});
});

it("octree.z(z) sets the z-accessor used by octree.addAll", () => {
  const q = octree().z(z).addAll([{0: 1, 1: 2, z: 3}]);
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, 1: 2, z: 3}});
});

it("octree.z(z) sets the z-accessor used by octree.remove", () => {
  const p0 = {0: 0, 1: 1, z: 2},
      p1 = {0: 1, 1: 2, z: 3},
      q = octree().z(z);
  assert.deepStrictEqual(q.add(p0).root(), {data: {0: 0, 1: 1, z: 2}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {0: 0, 1: 1, z: 2}},,,,,,, {data: {0: 1, 1: 2, z: 3}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {0: 0, 1: 1, z: 2}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function z(d) {
  return d.z;
}
