import assert from "assert";
import {octree} from "../src/index.js";

it("octree.visit(callback) visits each node in a octree", () => {
  const results = [], q = octree()
      .addAll([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]);
  assert.strictEqual(q.visit(function(node, x0, y0, z0, x1, y1, z1) { results.push([x0, y0, z0, x1, y1, z1]); }), q);
  assert.deepStrictEqual(results, [
    [0, 0, 0, 2, 2, 2],
    [0, 0, 0, 1, 1, 1],
    [1, 0, 0, 2, 1, 1],
    [0, 1, 0, 1, 2, 1],
    [1, 1, 0, 2, 2, 1],
    [0, 0, 1, 1, 1, 2],
    [1, 0, 1, 2, 1, 2],
    [0, 1, 1, 1, 2, 2],
    [1, 1, 1, 2, 2, 2]
  ]);
});

it("octree.visit(callback) applies pre-order traversal", () => {
  const results = [], q = octree()
      .extent([[0, 0, 0], [960, 960, 960]])
      .addAll([[100, 100, 100], [200, 200, 200], [300, 300, 300]]);
  assert.strictEqual(q.visit(function(node, x0, y0, z0, x1, y1, z1) { results.push([x0, y0, z0, x1, y1, z1]); }), q);
  assert.deepStrictEqual(results, [
    [  0,   0,   0, 1024, 1024, 1024],
    [  0,   0,   0,  512,  512,  512],
    [  0,   0,   0,  256,  256,  256],
    [  0,   0,   0,  128,  128,  128],
    [128, 128, 128,  256,  256,  256],
    [256, 256, 256,  512,  512,  512]
  ]);
});

it("octree.visit(callback) does not recurse if the callback returns truthy", () => {
  const results = [], q = octree()
      .extent([[0, 0, 0], [960, 960, 960]])
      .addAll([[100, 100, 100], [700, 700, 700], [800, 800, 800]]);
  assert.strictEqual(q.visit(function(node, x0, y0, z0, x1, y1, z1) { results.push([x0, y0, z0, x1, y1, z1]); return x0 > 0; }), q);
  assert.deepStrictEqual(results, [
    [   0,    0,    0, 1024, 1024, 1024],
    [   0,    0,    0,  512,  512,  512],
    [ 512,  512,  512, 1024, 1024, 1024]
  ]);
});

it("octree.visit(callback) on an empty octree with no bounds does nothing", () => {
  const results = [], q = octree();
  assert.strictEqual(q.visit(function(node, x0, y0, z0, x1, y1, z1) { results.push([x0, y0, z0, x1, y1, z1]); }), q);
  assert.strictEqual(results.length, 0);
});

it("octree.visit(callback) on an empty octree with bounds does nothing", () => {
  const results = [], q = octree()
      .extent([[0, 0, 0], [960, 960, 960]]);
  assert.strictEqual(q.visit(function(node, x0, y0, z0, x1, y1, z1) { results.push([x0, y0, z0, x1, y1, z1]); }), q);
  assert.deepStrictEqual(results.length, 0);
});
