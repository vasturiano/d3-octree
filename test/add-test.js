import assert from "assert";
import {octree} from "../src/index.js";

it("octree.add(datum) creates a new point and adds it to the octree", () => {
  const q = octree();
  assert.deepStrictEqual(q.add([0.0, 0.0, 0.0]).root(), {data: [0, 0, 0]});
  assert.deepStrictEqual(q.add([0.9, 0.9, 0.9]).root(), [{data: [0, 0, 0]},,,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.9, 0.0, 0.0]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]},,,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.9, 0.0]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},,,,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.0, 0.9]).root(), [{data: [0, 0, 0]}, {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},, {data: [0, 0, 0.9]},,, {data: [0.9, 0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.4, 0.4, 0.4]).root(), [[{data: [0, 0, 0]},,,,,,, {data: [0.4, 0.4, 0.4]}], {data: [0.9, 0, 0]}, {data: [0, 0.9, 0]},, {data: [0, 0, 0.9]},,, {data: [0.9, 0.9, 0.9]}]);
});

it("octree.add(datum) handles points being on the perimeter of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(q.add([0, 0, 0]).root(), {data: [0, 0, 0]});
  assert.deepStrictEqual(q.add([1, 1, 1]).root(), [{data: [0, 0, 0]},,,,,,, {data: [1, 1, 1]}]);
  assert.deepStrictEqual(q.add([1, 0, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]},,,,,, {data: [1, 1, 1]}]);
  assert.deepStrictEqual(q.add([0, 1, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0]},,,,, {data: [1, 1, 1]}]);
  assert.deepStrictEqual(q.add([0, 0, 1]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0]},, {data: [0, 0, 1]},,, {data: [1, 1, 1]}]);
});

it("octree.add(datum) handles points being to the left of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([-1, 1, 1]).extent(), [[-4, 0, 0], [4, 8, 8]]);
});

it("octree.add(datum) handles points being to the right of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([3, 1, 1]).extent(), [[0, 0, 0], [4, 4, 4]]);
});

it("octree.add(datum) handles points being to the top of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([1, -1, 1]).extent(), [[0, -4, 0], [8, 4, 8]]);
});

it("octree.add(datum) handles points being to the bottom of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([1, 3, 1]).extent(), [[0, 0, 0], [4, 4, 4]]);
});

it("octree.add(datum) handles points being to the front of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([1, 1, -1]).extent(), [[0, 0, -4], [8, 8, 4]]);
});

it("octree.add(datum) handles points being to the back of the octree bounds", () => {
  const q = octree().extent([[0, 0, 0], [2, 2, 2]]);
  assert.deepStrictEqual(q.add([1, 1, 3]).extent(), [[0, 0, 0], [4, 4, 4]]);
});

it("octree.add(datum) handles coincident points by creating a linked list", () => {
  const q = octree().extent([[0, 0, 0], [1, 1, 1]]);
  assert.deepStrictEqual(q.add([0, 0, 0]).root(), {data: [0, 0, 0]});
  assert.deepStrictEqual(q.add([1, 0, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]},,,,,,, ]);
  assert.deepStrictEqual(q.add([0, 1, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0]},,,,,, ]);
  assert.deepStrictEqual(q.add([0, 1, 0]).root(), [{data: [0, 0, 0]}, {data: [1, 0, 0]}, {data: [0, 1, 0], next: {data: [0, 1, 0]}},,,,,, ]);
});

it("octree.add(datum) implicitly defines trivial bounds for the first point", () => {
  const q = octree().add([1, 2, 3]);
  assert.deepStrictEqual(q.extent(), [[1, 2, 3], [2, 3, 4]]);
  assert.deepStrictEqual(q.root(), {data: [1, 2, 3]});
});
