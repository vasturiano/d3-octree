import Octant from "./octant";

export default function(callback) {
  var octs = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) octs.push(new Octant(node, this._x0, this._y0, this._x1, this._y1));
  while (q = octs.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) octs.push(new Octant(child, xm, ym, x1, y1));
      if (child = node[2]) octs.push(new Octant(child, x0, ym, xm, y1));
      if (child = node[1]) octs.push(new Octant(child, xm, y0, x1, ym));
      if (child = node[0]) octs.push(new Octant(child, x0, y0, xm, ym));
    }
  }
  return this;
}
