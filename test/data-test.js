import assert from "assert";
import {octree} from "../src/index.js";

it("octree.data() returns an array of data in the octree", () => {
  const q = octree();
  assert.deepStrictEqual(q.data(), []);
  q.add([0, 0, 0]).add([1, 2, 3]);
  assert.deepStrictEqual(q.data(), [[0, 0, 0], [1, 2, 3]]);
});

it("octree.data() correctly handles coincident nodes", () => {
  const q = octree();
  q.add([0, 0, 0]).add([0, 0, 0]);
  assert.deepStrictEqual(q.data(), [[0, 0, 0], [0, 0, 0]]);
});
