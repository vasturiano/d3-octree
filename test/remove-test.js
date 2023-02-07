import assert from "assert";
import {octree} from "../src/index.js";

it("octree.remove(datum) removes a point and returns the octree", () => {
  const p0 = [1, 1, 1],
      q = octree().add(p0);
  assert.deepStrictEqual(q.root(), {data: p0});
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.root(), undefined);
});

it("octree.remove(datum) removes the only point in the octree", () => {
  const p0 = [1, 1, 1],
      q = octree().add(p0);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.deepStrictEqual(q.root(), undefined);
  assert.deepStrictEqual(p0, [1, 1, 1]);
});

it("octree.remove(datum) removes a first coincident point at the root in the octree", () => {
  const p0 = [1, 1, 1],
      p1 = [1, 1, 1],
      q = octree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [1, 1, 1]);
  assert.deepStrictEqual(p1, [1, 1, 1]);
});

it("octree.remove(datum) removes another coincident point at the root in the octree", () => {
  const p0 = [1, 1, 1],
      p1 = [1, 1, 1],
      q = octree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[1, 1, 1], [2, 2, 2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [1, 1, 1]);
  assert.deepStrictEqual(p1, [1, 1, 1]);
});

it("octree.remove(datum) removes a non-root point in the octree", () => {
  const p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q = octree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [2, 2, 2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [0, 0, 0]);
  assert.deepStrictEqual(p1, [1, 1, 1]);
});

it("octree.remove(datum) removes another non-root point in the octree", () => {
  const p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q = octree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [2, 2, 2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [0, 0, 0]);
  assert.deepStrictEqual(p1, [1, 1, 1]);
});

it("octree.remove(datum) ignores a point not in the octree", () => {
  const p0 = [0, 0, 0],
      p1 = [1, 1, 1],
      q0 = octree().add(p0),
      q1 = octree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("octree.remove(datum) ignores a coincident point not in the octree", () => {
  const p0 = [0, 0, 0],
      p1 = [0, 0, 0],
      q0 = octree().add(p0),
      q1 = octree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0, 0, 0], [1, 1, 1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("octree.remove(datum) removes another point in the octree", () => {
  const q = octree()
      .extent([[0, 0, 0], [959, 959, 959]])
      .addAll([[630, 438, 438], [715, 464, 464], [523, 519, 519], [646, 318, 318], [434, 620, 620], [570, 489, 489], [520, 345, 345], [459, 443, 443], [346, 405, 405], [529, 444, 444]]);
  assert.strictEqual(q.remove(q.find(546, 440, 440)), q);
  assert.deepStrictEqual(q.extent(), [[0, 0, 0], [1024, 1024, 1024]]);
  assert.deepStrictEqual(q.root(), [
    [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [
        ,
        ,
        ,
        ,
        ,
        ,
        {data: [346, 405, 405]},
        {data: [459, 443, 443]}
      ]
    ],
    [
      ,
      ,
      ,
      ,
      ,
      ,
      [
        {data: [520, 345, 345]},
        {data: [646, 318, 318]},
        ,
        ,
        ,
        ,
        [
          ,
          {data: [630, 438, 438]},
          ,
          ,
          ,
          ,
          {data: [570, 489, 489]},,

        ],
        {data: [715, 464, 464]}
      ],,
    ],
    ,
    ,
    ,
    ,
    {data: [434, 620, 620]},
    {data: [523, 519, 519]}
  ]);
});
