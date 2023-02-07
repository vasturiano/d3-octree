import assert from "assert";
import {octree} from "../src/index.js";

it("octree.cover(x, y, z) sets a trivial extent if the extent was undefined", () => {
  assert.deepStrictEqual(octree().cover(1, 2, 3).extent(), [[1, 2, 3], [2, 3, 4]]);
});

it("octree.cover(x, y, z) sets a non-trivial squarified and centered extent if the extent was trivial", () => {
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(1, 2, 2).extent(), [[0, 0, 0], [4, 4, 4]]);
});

it("octree.cover(x, y, z) ignores invalid points", () => {
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(NaN, 2, 2).extent(), [[0, 0, 0], [1, 1, 1]]);
});

it("octree.cover(x, y, z) repeatedly doubles the existing extent if the extent was non-trivial", () => {
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, -1, -1).extent(), [[-4, -4, -4], [4, 4, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(1, -1, 1).extent(), [[0, -4, 0], [8, 4, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, -1, 1).extent(), [[0, -4, 0], [8, 4, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 1, -1).extent(), [[0, 0, -4], [8, 8, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 3, 3).extent(), [[0, 0, 0], [4, 4, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(1, 3, 1).extent(), [[0, 0, 0], [4, 4, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, 3, -1).extent(), [[-4, 0, -4], [4, 8, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-1, 1, 1).extent(), [[-4, 0, 0], [4, 8, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, -3, -3).extent(), [[-4, -4, -4], [4, 4, 4]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, -3, 3).extent(), [[0, -4, 0], [8, 4, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, -3, 1).extent(), [[0, -4, 0], [8, 4, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, 3, 5).extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(5, 5, 5).extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(3, 5, 3).extent(), [[0, 0, 0], [8, 8, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, 5, 3).extent(), [[-4, 0, 0], [4, 8, 8]]);
  assert.deepStrictEqual(octree().cover(0, 0, 0).cover(2, 2, 2).cover(-3, 3, -3).extent(), [[-4, 0, -4], [4, 8, 4]]);
});

it("octree.cover(x, y, z) repeatedly wraps the root node if it has children", () => {
  const q = octree().add([0, 0, 0]).add([2, 2, 2]);
  assert.deepStrictEqual(q.root(), [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]);
  assert.deepStrictEqual(q.copy().cover(3, 3, 3).root(), [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]);
  assert.deepStrictEqual(q.copy().cover(-1, 3, 1).root(), [,[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,,, ]);
  assert.deepStrictEqual(q.copy().cover(3, -1, 1).root(), [,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,, ]);
  assert.deepStrictEqual(q.copy().cover(-1, -1, -1).root(), [,,,,,,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]]);
  assert.deepStrictEqual(q.copy().cover(5, 5, 5).root(), [[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,,,, ]);
  assert.deepStrictEqual(q.copy().cover(-3, 5, 5).root(), [,[{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,,, ]);
  assert.deepStrictEqual(q.copy().cover(5, -3, 5).root(), [,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}],,,,,, ]);
  assert.deepStrictEqual(q.copy().cover(-3, -3, -3).root(), [,,,,,,, [{data: [0, 0, 0]},,,,,,, {data: [2, 2, 2]}]]);
});

it("octree.cover(x, y, z) does not wrap the root node if it is a leaf", () => {
  const q = octree().cover(0, 0, 0).add([2, 2, 2]);
  assert.deepStrictEqual(q.root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(3, 3, 3).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(-1, 3, -1).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(3, -1, 3).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(-1, -1, -1).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(5, 5, 5).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(-3, 5, 5).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(5, -3, -3).root(), {data: [2, 2, 2]});
  assert.deepStrictEqual(q.copy().cover(-3, -3, -3).root(), {data: [2, 2, 2]});
});

it("octree.cover(x, y, z) does not wrap the root node if it is undefined", () => {
  const q = octree().cover(0, 0, 0).cover(2, 2, 2);
  assert.strictEqual(q.root(), undefined);
  assert.strictEqual(q.copy().cover(3, 3, 3).root(), undefined);
  assert.strictEqual(q.copy().cover(-1, 3, -1).root(), undefined);
  assert.strictEqual(q.copy().cover(3, -1, 3).root(), undefined);
  assert.strictEqual(q.copy().cover(-1, -1, -1).root(), undefined);
  assert.strictEqual(q.copy().cover(5, 5, 5).root(), undefined);
  assert.strictEqual(q.copy().cover(-3, 5, 5).root(), undefined);
  assert.strictEqual(q.copy().cover(5, -3, -3).root(), undefined);
  assert.strictEqual(q.copy().cover(-3, -3, -3).root(), undefined);
});

it("octree.cover() does not crash on huge values", () => {
  octree([[1e23, 0, 0]]);
});
