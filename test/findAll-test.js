import assert from "assert";
import {octree} from "../src/index.js";

it("octree.findAllWithinRadius(x, y, z) returns the relevant points within the search radius", () => {
  const q = octree([[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);

  assert.deepStrictEqual(q.findAllWithinRadius(50, 50, 50, 90), [[0, 0, 0], [100, 0, 0], [0, 100, 0], [100, 100, 0], [0, 0, 100], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  assert.deepStrictEqual(q.findAllWithinRadius(50, 50, 50, 70), []);
  assert.deepStrictEqual(q.findAllWithinRadius(100, 100, 100, 100), [[100, 100, 0], [100, 0, 100], [0, 100, 100], [100, 100, 100]]);
  assert.deepStrictEqual(q.findAllWithinRadius(100, 100, 100, 99), [[100, 100, 100]]);
});
