import assert from "assert";
import {octree} from "../src/index.js";

it("octree.extent(extent) extends the extent", () => {
  assert.deepStrictEqual(octree().extent([[0, 1, 2], [2, 6, 4]]).extent(), [[0, 1, 2], [8, 9, 10]]);
});

it("octree.extent() can be inferred by octree.cover", () => {
  const q = octree();
  assert.deepStrictEqual(q.cover(0, 0, 0).extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(q.cover(2, 4, 6).extent(), [[0, 0, 0], [8, 8, 8]]);
});

it("octree.extent() can be inferred by octree.add", () => {
  const q = octree();
  q.add([0, 0, 0]);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [1, 1, 1]]);
  q.add([2, 4, 6]);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [8, 8, 8]]);
});

it("octree.extent(extent) squarifies and centers the specified extent", () => {
  assert.deepStrictEqual(octree().extent([[0, 1, 2], [2, 6, 4]]).extent(), [[0, 1, 2], [8, 9, 10]]);
});

it("octree.extent(extent) ignores invalid extents", () => {
  assert.strictEqual(octree().extent([[1, NaN, 1], [NaN, 0, 1], [0, 0, NaN]]).extent(), undefined);
  assert.strictEqual(octree().extent([[NaN, 1, 1], [0, NaN, 1], , [0, 0, NaN]]).extent(), undefined);
  assert.strictEqual(octree().extent([[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]]).extent(), undefined);
});

it("octree.extent(extent) flips inverted extents", () => {
  assert.deepStrictEqual(octree().extent([[1, 1, 1], [0, 0, 0]]).extent(), [[0, 0, 0], [2, 2, 2]]);
});

it("octree.extent(extent) tolerates partially-valid extents", () => {
  assert.deepStrictEqual(octree().extent([[NaN, 0, 0], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.deepStrictEqual(octree().extent([[0, NaN, 0], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.deepStrictEqual(octree().extent([[0, 0, NaN], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.deepStrictEqual(octree().extent([[0, 0, 0], [NaN, 1, 1]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(octree().extent([[0, 0, 0], [1, NaN, 1]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(octree().extent([[0, 0, 0], [1, 1, NaN]]).extent(), [[0, 0, 0], [1, 1, 1]]);
});

it("octree.extent(extent) allows trivial extents", () => {
  assert.deepStrictEqual(octree().extent([[0, 0, 0], [0, 0, 0]]).extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(octree().extent([[1, 1, 1], [1, 1, 1]]).extent(), [[1, 1, 1], [2, 2, 2]]);
});
