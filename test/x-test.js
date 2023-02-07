import assert from "assert";
import {octree} from "../src/index.js";

it("octree.x(x) sets the x-accessor used by octree.add", () => {
  const q = octree().x(x).add({x: 1, 1: 2, 2: 3});
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1, 1: 2, 2: 3}});
});

it("octree.x(x) sets the x-accessor used by octree.addAll", () => {
  const q = octree().x(x).addAll([{x: 1, 1: 2, 2: 3}]);
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1, 1: 2, 2: 3}});
});

it("octree.x(x) sets the x-accessor used by octree.remove", () => {
  const p0 = {x: 0, 1: 1, 2: 2},
      p1 = {x: 1, 1: 2, 2: 3},
      q = octree().x(x);
  assert.deepStrictEqual(q.add(p0).root(), {data: {x: 0, 1: 1, 2: 2}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {x: 0, 1: 1, 2: 2}},,,,,,, {data: {x: 1, 1: 2, 2: 3}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {x: 0, 1: 1, 2: 2}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function x(d) {
  return d.x;
}
