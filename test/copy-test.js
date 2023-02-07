import assert from "assert";
import {octree} from "../src/index.js";

it("octree.copy() returns a copy of this octree", () => {
  const q0 = octree().addAll([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]);
  assert.deepStrictEqual(q0.copy(), q0);
});

it("octree.copy() isolates changes to the extent", () => {
  const q0 = octree().extent([[0, 0, 0], [1, 1, 1]]),
    q1 = q0.copy();
  q0.add([2, 2, 2]);
  assert.deepStrictEqual(q1.extent(), [[0, 0, 0], [2, 2, 2]]);
  q1.add([-1, -1, -1]);
  assert.deepStrictEqual(q0.extent(), [[0, 0, 0], [4, 4, 4]]);
});

it("octree.copy() isolates changes to the root when a leaf", () => {
  let q0 = octree().extent([[0, 0, 0], [1, 1, 1]]),
    q1 = q0.copy(),
    p0 = [2, 2, 2];
  q0.add(p0);
  assert.strictEqual(q1.root(), undefined);
  q1 = q0.copy();
  assert.deepStrictEqual(q0.root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q1.root(), {data: [2, 2, 2]});
  assert.strictEqual(q0.remove(p0), q0);
  assert.strictEqual(q0.root(), undefined);
  assert.deepStrictEqual(q1.root(), {data: [2, 2, 2]});
});

it("octree.copy() isolates changes to the root when not a leaf", () => {
  const p0 = [1, 1, 1],
    p1 = [2, 2, 2],
    p2 = [3, 3, 3],
    q0 = octree().extent([[0, 0, 0], [4, 4, 4]]).addAll([p0, p1]);
  let q1 = q0.copy();
  q0.add(p2);
  assert.deepStrictEqual(q0.extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(q0.root(), [[{data: [1, 1, 1]},,,,,,, [{data: [2, 2, 2]},,,,,,, {data: [3, 3, 3]}]],,,,,,,, ]);
  assert.deepStrictEqual(q1.extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(q1.root(), [[{data: [1, 1, 1]},,,,,,, {data: [2, 2, 2]}],,,,,,,, ]);
  q1 = q0.copy();
  q0.remove(p2);
  assert.deepStrictEqual(q1.extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(q1.root(), [[{data: [1, 1, 1]},,,,,,, [{data: [2, 2, 2]},,,,,,, {data: [3, 3, 3]}]],,,,,,,, ]);
});
