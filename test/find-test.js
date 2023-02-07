import assert from "assert";
import {octree} from "../src/index.js";

it("octree.find(x, y, z) returns the closest point to the given [x, y, z]", () => {
  const dx = 17,
      dy = 17,
      dz = 17,
      q = octree();
  for (let i = 0, n = dx * dy * dz; i < n; ++i) { q.add([i % dx, (i / dx) % dx | 0,  (i / dx / dx) % dx | 0]); }
  assert.deepStrictEqual(q.find( 0.1,  0.1,  0.1), [ 0,  0,  0]);
  assert.deepStrictEqual(q.find( 7.1,  7.1,  7.1), [ 7,  7,  7]);
  assert.deepStrictEqual(q.find( 0.1, 15.9,  7.1), [ 0, 16,  7]);
  assert.deepStrictEqual(q.find( 0.1, 7.1,  15.9), [ 0, 7,  16]);
  assert.deepStrictEqual(q.find(15.9, 15.9, 15.9), [16, 16, 16]);
});

it("octree.find(x, y, z, radius) returns the closest point within the search radius to the given [x, y, z]", () => {
  const q = octree([[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  assert.deepStrictEqual(q.find(20, 20, 20, Infinity), [0, 0, 0]);

  assert.deepStrictEqual(q.find(20, 20, 20, 20 * Math.sqrt(3) + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(20, 20, 20, 20 * Math.sqrt(3) - 1e-6), undefined);

  assert.deepStrictEqual(q.find(0, 20, 20, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(0, 20, 20, 20 * Math.SQRT2 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(20, 0, 20, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(20, 0, 20, 20 * Math.SQRT2 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(20, 20, 0, 20 * Math.SQRT2 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(20, 20, 0, 20 * Math.SQRT2 - 1e-6), undefined);

  assert.deepStrictEqual(q.find(20, 0, 0, 20 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(20, 0, 0, 20 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(0, 20, 0, 20 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(0, 20, 0, 20 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(0, 0, 20, 20 + 1e-6), [0, 0, 0]);
  assert.strictEqual(q.find(0, 0, 20, 20 - 1e-6), undefined);
});

it("octree.find(x, y, z, null) treats the given radius as Infinity", () => {
  const q = octree([[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  assert.deepStrictEqual(q.find(20, 20, 20, null), [0, 0, 0]);
  assert.deepStrictEqual(q.find(20, 20, 20, undefined), [0, 0, 0]);
});
