import assert from "assert";
import {octree} from "../src/index.js";

it("octree.y(y) sets the y-accessor used by octree.add", () => {
  const q = octree().y(y).add({0: 1, y: 2, 2: 3});
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, y: 2, 2: 3}});
});

it("octree.y(y) sets the y-accessor used by octree.addAll", () => {
  const q = octree().y(y).addAll([{0: 1, y: 2, 2: 3}]);
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {0: 1, y: 2, 2: 3}});
});

it("octree.y(y) sets the y-accessor used by octree.remove", () => {
  const p0 = {0: 0, y: 1, 2: 2},
      p1 = {0: 1, y: 2, 2: 3},
      q = octree().y(y);
  assert.deepStrictEqual(q.add(p0).root(), {data: {0: 0, y: 1, 2: 2}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {0: 0, y: 1, 2: 2}},,,,,,, {data: {0: 1, y: 2, 2: 3}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {0: 0, y: 1, 2: 2}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function y(d) {
  return d.y;
}
