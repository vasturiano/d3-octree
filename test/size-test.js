import assert from "assert";
import {octree} from "../src/index.js";

it("octree.size() returns the number of points in the octree", () => {
  const q = octree();
  assert.strictEqual(q.size(), 0);
  q.add([0, 0, 0]).add([1, 2, 3]);
  assert.strictEqual(q.size(), 2);
});

it("octree.size() correctly counts coincident nodes", () => {
  const q = octree();
  q.add([0, 0, 0]).add([0, 0, 0]);
  assert.strictEqual(q.size(), 2);
});
