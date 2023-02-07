import assert from "assert";
import {octree} from "../src/index.js";

it("octree.addAll(data) creates new points and adds them to the octree", () =>  {
  const q = octree();
  assert.deepStrictEqual(q.add([0.0, 0.0, 0.0]).root(), {data: [0, 0, 0]});
  assert.deepStrictEqual(q.add([0.9, 0.9, 0.9]).root(), [{data: [0, 0, 0]},,,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.9, 0.0, 0.0]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]},,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.9, 0.0]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.0, 0.9]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},, {data: [0, 0, 0.9]},,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.4, 0.4, 0.4]).root(), [[{data: [0, 0, 0]},,,,,,, {data: [0.4, 0.4, 0.4]}], {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},, {data: [0, 0, 0.9]},,, {data: [0.9, 0.9, 0.9]}]);
});

it("octree.addAll(data) ignores points with NaN coordinates", () =>  {
  const q = octree();
  assert.deepStrictEqual(q.addAll([[NaN, 0, 0], [0, NaN, 0], [0, 0, NaN]]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0, 0], [0.9, 0.9, 0.9]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.addAll([[NaN, 0, 0], [0, NaN, 0], [0, 0, NaN]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [1, 1, 1]]);
});

it("octree.addAll(data) correctly handles the empty array", () =>  {
  const q = octree();
  assert.deepStrictEqual(q.addAll([]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0, 0], [1, 1, 1]]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  assert.deepStrictEqual(q.addAll([]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [2, 2, 2]]);
});

it("octree.addAll(data) computes the extent of the data before adding", () => {
  const q = octree().addAll([[0.4, 0.4, 0.4], [0, 0, 0], [0.9, 0.9, 0.9]]);
  assert.deepStrictEqual(q.root(), [[{data: [0, 0, 0]}, , , , , , , {data: [0.4, 0.4, 0.4]}], , , , , , , {data: [0.9, 0.9, 0.9]}]);
});

it("octree.addAll(iterable) adds points from an iterable", () => {
  const q = octree().addAll(new Set([[0.4, 0.4, 0.4], [0, 0, 0], [0.9, 0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0, 0]}, , , , , , , {data: [0.4, 0.4, 0.4]}], , , , , , , {data: [0.9, 0.9, 0.9]}]);
});

it("octree(iterable) adds points from an iterable", () => {
  const q = octree(new Set([[0.4, 0.4, 0.4], [0, 0, 0], [0.9, 0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0, 0]}, , , , , , , {data: [0.4, 0.4, 0.4]}], , , , , , , {data: [0.9, 0.9, 0.9]}]);
});
