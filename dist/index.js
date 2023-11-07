// src/utils.ts/kaboom/dist/kaboom.mjs
var Re = function(r) {
  return r * Math.PI / 180;
};
var nt = function(r) {
  return r * 180 / Math.PI;
};
var De = function(r, e, o) {
  return e > o ? De(r, o, e) : Math.min(Math.max(r, e), o);
};
var Fe = function(r, e, o) {
  if (typeof r == "number" && typeof e == "number")
    return r + (e - r) * o;
  if (r instanceof y && e instanceof y)
    return r.lerp(e, o);
  if (r instanceof X && e instanceof X)
    return r.lerp(e, o);
  throw new Error(`Bad value for lerp(): ${r}, ${e}. Only number, Vec2 and Color is supported.`);
};
var Ge = function(r, e, o, d, g) {
  return d + (r - e) / (o - e) * (g - d);
};
var gr = function(r, e, o, d, g) {
  return De(Ge(r, e, o, d, g), d, g);
};
var T = function(...r) {
  if (r.length === 1) {
    if (r[0] instanceof y)
      return new y(r[0].x, r[0].y);
    if (Array.isArray(r[0]) && r[0].length === 2)
      return new y(...r[0]);
  }
  return new y(...r);
};
var Z = function(...r) {
  if (r.length === 0)
    return new X(255, 255, 255);
  if (r.length === 1) {
    if (r[0] instanceof X)
      return r[0].clone();
    if (typeof r[0] == "string")
      return X.fromHex(r[0]);
    if (Array.isArray(r[0]) && r[0].length === 3)
      return X.fromArray(r[0]);
  }
  return new X(...r);
};
var oe = function(r, e, o, d) {
  return new re(r, e, o, d);
};
var Ln = function(r, e, o, d = (g) => -Math.cos(g)) {
  return r + (d(o) + 1) / 2 * (e - r);
};
var br = function(r) {
  return r != null && (Gn.seed = r), Gn.seed;
};
var bt = function(...r) {
  return Gn.genAny(...r);
};
var In = function(...r) {
  return Math.floor(bt(...r));
};
var vr = function(r) {
  return bt() <= r;
};
var yr = function(r) {
  return r[In(r.length)];
};
var xr = function(r, e) {
  return r.pos.x + r.width > e.pos.x && r.pos.x < e.pos.x + e.width && r.pos.y + r.height > e.pos.y && r.pos.y < e.pos.y + e.height;
};
var bi = function(r, e) {
  if (r.p1.x === r.p2.x && r.p1.y === r.p2.y || e.p1.x === e.p2.x && e.p1.y === e.p2.y)
    return null;
  let o = (e.p2.y - e.p1.y) * (r.p2.x - r.p1.x) - (e.p2.x - e.p1.x) * (r.p2.y - r.p1.y);
  if (o === 0)
    return null;
  let d = ((e.p2.x - e.p1.x) * (r.p1.y - e.p1.y) - (e.p2.y - e.p1.y) * (r.p1.x - e.p1.x)) / o, g = ((r.p2.x - r.p1.x) * (r.p1.y - e.p1.y) - (r.p2.y - r.p1.y) * (r.p1.x - e.p1.x)) / o;
  return d < 0 || d > 1 || g < 0 || g > 1 ? null : d;
};
var tt = function(r, e) {
  let o = bi(r, e);
  return o ? T(r.p1.x + o * (r.p2.x - r.p1.x), r.p1.y + o * (r.p2.y - r.p1.y)) : null;
};
var Ur = function(r, e) {
  if (gt(r, e.p1) || gt(r, e.p2))
    return true;
  let o = r.points();
  return !!tt(e, new Me(o[0], o[1])) || !!tt(e, new Me(o[1], o[2])) || !!tt(e, new Me(o[2], o[3])) || !!tt(e, new Me(o[3], o[0]));
};
var gt = function(r, e) {
  return e.x > r.pos.x && e.x < r.pos.x + r.width && e.y > r.pos.y && e.y < r.pos.y + r.height;
};
var Er = function(r, e) {
  let o = e.sub(r.p1), d = r.p2.sub(r.p1);
  if (Math.abs(o.cross(d)) > Number.EPSILON)
    return false;
  let g = o.dot(d) / d.dot(d);
  return g >= 0 && g <= 1;
};
var Vn = function(r, e) {
  let o = r.p2.sub(r.p1), d = o.dot(o), g = r.p1.sub(e.center), m = 2 * o.dot(g), O = g.dot(g) - e.radius * e.radius, L = m * m - 4 * d * O;
  if (d <= Number.EPSILON || L < 0)
    return false;
  if (L == 0) {
    let j = -m / (2 * d);
    if (j >= 0 && j <= 1)
      return true;
  } else {
    let j = (-m + Math.sqrt(L)) / (2 * d), x = (-m - Math.sqrt(L)) / (2 * d);
    if (j >= 0 && j <= 1 || x >= 0 && x <= 1)
      return true;
  }
  return Sr(e, r.p1);
};
var Sr = function(r, e) {
  return r.center.sdist(e) < r.radius * r.radius;
};
var Cr = function(r, e) {
  let o = e.pts[e.pts.length - 1];
  for (let d of e.pts) {
    if (Vn(new Me(o, d), r))
      return true;
    o = d;
  }
  return Sr(r, e.pts[0]) ? true : kn(e, r.center);
};
var kn = function(r, e) {
  let o = false, d = r.pts;
  for (let g = 0, m = d.length - 1;g < d.length; m = g++)
    d[g].y > e.y != d[m].y > e.y && e.x < (d[m].x - d[g].x) * (e.y - d[g].y) / (d[m].y - d[g].y) + d[g].x && (o = !o);
  return o;
};
var Tr = function(r, e) {
  let o = Number.MAX_VALUE, d = T(0);
  for (let g of [r, e])
    for (let m = 0;m < g.pts.length; m++) {
      let O = g.pts[m], j = g.pts[(m + 1) % g.pts.length].sub(O).normal().unit(), x = Number.MAX_VALUE, Y = -Number.MAX_VALUE;
      for (let z = 0;z < r.pts.length; z++) {
        let ee = r.pts[z].dot(j);
        x = Math.min(x, ee), Y = Math.max(Y, ee);
      }
      let S = Number.MAX_VALUE, q = -Number.MAX_VALUE;
      for (let z = 0;z < e.pts.length; z++) {
        let ee = e.pts[z].dot(j);
        S = Math.min(S, ee), q = Math.max(q, ee);
      }
      let E = Math.min(Y, q) - Math.max(x, S);
      if (E < 0)
        return null;
      if (E < Math.abs(o)) {
        let z = q - x, ee = S - Y;
        o = Math.abs(z) < Math.abs(ee) ? z : ee, d = j.scale(o);
      }
    }
  return d;
};
var qt = function(r, e) {
  if (r === e)
    return true;
  let o = typeof r, d = typeof e;
  if (o !== d)
    return false;
  if (o === "object" && d === "object" && r !== null && e !== null) {
    if (Array.isArray(r) !== Array.isArray(e))
      return false;
    let g = Object.keys(r), m = Object.keys(e);
    if (g.length !== m.length)
      return false;
    for (let O of g) {
      let L = r[O], j = e[O];
      if (!qt(L, j))
        return false;
    }
    return true;
  }
  return false;
};
var vi = function(r) {
  let e = window.atob(r), o = e.length, d = new Uint8Array(o);
  for (let g = 0;g < o; g++)
    d[g] = e.charCodeAt(g);
  return d.buffer;
};
var Nn = function(r) {
  return vi(r.split(",")[1]);
};
var $t = function(r, e) {
  let o = document.createElement("a");
  o.href = e, o.download = r, o.click();
};
var jn = function(r, e) {
  $t(r, "data:text/plain;charset=utf-8," + e);
};
var Ar = function(r, e) {
  jn(r, JSON.stringify(e));
};
var _n = function(r, e) {
  let o = URL.createObjectURL(e);
  $t(r, o), URL.revokeObjectURL(o);
};
var zt = function(r) {
  let e = {};
  return { cur: (o) => {
    let d = e[o] ?? [];
    return d[d.length - 1];
  }, push: (o, d) => {
    e[o] || (e[o] = []), e[o].push(d), r(o, d);
  }, pop: (o) => {
    let d = e[o];
    if (!d)
      throw new Error(`Unknown WebGL type: ${o}`);
    if (d.length <= 0)
      throw new Error("Can't unbind texture when there's no texture bound");
    d.pop(), r(o, d[d.length - 1] ?? null);
  } };
};
var ot = function(r) {
  switch (r) {
    case "topleft":
      return new y(-1, -1);
    case "top":
      return new y(0, -1);
    case "topright":
      return new y(1, -1);
    case "left":
      return new y(-1, 0);
    case "center":
      return new y(0, 0);
    case "right":
      return new y(1, 0);
    case "botleft":
      return new y(-1, 1);
    case "bot":
      return new y(0, 1);
    case "botright":
      return new y(1, 1);
    default:
      return r;
  }
};
var Vi = function(r) {
  switch (r) {
    case "left":
      return 0;
    case "center":
      return 0.5;
    case "right":
      return 1;
    default:
      return 0;
  }
};
var ki = function(r) {
  return r.createBuffer(1, 1, 44100);
};
var pi = Object.defineProperty;
var i = (r, e) => pi(r, "name", { value: e, configurable: true });
var mr = (() => {
  for (var r = new Uint8Array(128), e = 0;e < 64; e++)
    r[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
  return (o) => {
    for (var d = o.length, g = new Uint8Array((d - (o[d - 1] == "=") - (o[d - 2] == "=")) * 3 / 4 | 0), m = 0, O = 0;m < d; ) {
      var L = r[o.charCodeAt(m++)], j = r[o.charCodeAt(m++)], x = r[o.charCodeAt(m++)], Y = r[o.charCodeAt(m++)];
      g[O++] = L << 2 | j >> 4, g[O++] = j << 4 | x >> 2, g[O++] = x << 6 | Y;
    }
    return g;
  };
})();
i(Re, "deg2rad");
i(nt, "rad2deg");
i(De, "clamp");
i(Fe, "lerp");
i(Ge, "map");
i(gr, "mapc");
var y = class r {
  static {
    i(this, "Vec2");
  }
  x = 0;
  y = 0;
  constructor(e = 0, o = e) {
    this.x = e, this.y = o;
  }
  static fromAngle(e) {
    let o = Re(e);
    return new r(Math.cos(o), Math.sin(o));
  }
  static LEFT = new r(-1, 0);
  static RIGHT = new r(1, 0);
  static UP = new r(0, -1);
  static DOWN = new r(0, 1);
  clone() {
    return new r(this.x, this.y);
  }
  add(...e) {
    let o = T(...e);
    return new r(this.x + o.x, this.y + o.y);
  }
  sub(...e) {
    let o = T(...e);
    return new r(this.x - o.x, this.y - o.y);
  }
  scale(...e) {
    let o = T(...e);
    return new r(this.x * o.x, this.y * o.y);
  }
  dist(...e) {
    let o = T(...e);
    return this.sub(o).len();
  }
  sdist(...e) {
    let o = T(...e);
    return this.sub(o).slen();
  }
  len() {
    return Math.sqrt(this.dot(this));
  }
  slen() {
    return this.dot(this);
  }
  unit() {
    let e = this.len();
    return e === 0 ? new r(0) : this.scale(1 / e);
  }
  normal() {
    return new r(this.y, -this.x);
  }
  reflect(e) {
    return this.sub(e.scale(2 * this.dot(e)));
  }
  project(e) {
    return e.scale(e.dot(this) / e.len());
  }
  reject(e) {
    return this.sub(this.project(e));
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  angle(...e) {
    let o = T(...e);
    return nt(Math.atan2(this.y - o.y, this.x - o.x));
  }
  angleBetween(...e) {
    let o = T(...e);
    return nt(Math.atan2(this.cross(o), this.dot(o)));
  }
  lerp(e, o) {
    return new r(Fe(this.x, e.x, o), Fe(this.y, e.y, o));
  }
  slerp(e, o) {
    let d = this.dot(e), g = this.cross(e), m = Math.atan2(g, d);
    return this.scale(Math.sin((1 - o) * m)).add(e.scale(Math.sin(o * m))).scale(1 / g);
  }
  isZero() {
    return this.x === 0 && this.y === 0;
  }
  toFixed(e) {
    return new r(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
  }
  transform(e) {
    return e.multVec2(this);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y;
  }
  bbox() {
    return new ue(this, 0, 0);
  }
  toString() {
    return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
};
i(T, "vec2");
var X = class r2 {
  static {
    i(this, "Color");
  }
  r = 255;
  g = 255;
  b = 255;
  constructor(e, o, d) {
    this.r = De(e, 0, 255), this.g = De(o, 0, 255), this.b = De(d, 0, 255);
  }
  static fromArray(e) {
    return new r2(e[0], e[1], e[2]);
  }
  static fromHex(e) {
    if (typeof e == "number")
      return new r2(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
    if (typeof e == "string") {
      let o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return new r2(parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16));
    } else
      throw new Error("Invalid hex color format");
  }
  static fromHSL(e, o, d) {
    if (o == 0)
      return new r2(255 * d, 255 * d, 255 * d);
    let g = i((Y, S, q) => (q < 0 && (q += 1), q > 1 && (q -= 1), q < 1 / 6 ? Y + (S - Y) * 6 * q : q < 1 / 2 ? S : q < 2 / 3 ? Y + (S - Y) * (2 / 3 - q) * 6 : Y), "hue2rgb"), m = d < 0.5 ? d * (1 + o) : d + o - d * o, O = 2 * d - m, L = g(O, m, e + 1 / 3), j = g(O, m, e), x = g(O, m, e - 1 / 3);
    return new r2(Math.round(L * 255), Math.round(j * 255), Math.round(x * 255));
  }
  static RED = new r2(255, 0, 0);
  static GREEN = new r2(0, 255, 0);
  static BLUE = new r2(0, 0, 255);
  static YELLOW = new r2(255, 255, 0);
  static MAGENTA = new r2(255, 0, 255);
  static CYAN = new r2(0, 255, 255);
  static WHITE = new r2(255, 255, 255);
  static BLACK = new r2(0, 0, 0);
  clone() {
    return new r2(this.r, this.g, this.b);
  }
  lighten(e) {
    return new r2(this.r + e, this.g + e, this.b + e);
  }
  darken(e) {
    return this.lighten(-e);
  }
  invert() {
    return new r2(255 - this.r, 255 - this.g, 255 - this.b);
  }
  mult(e) {
    return new r2(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
  }
  lerp(e, o) {
    return new r2(Fe(this.r, e.r, o), Fe(this.g, e.g, o), Fe(this.b, e.b, o));
  }
  toHSL() {
    let e = this.r / 255, o = this.g / 255, d = this.b / 255, g = Math.max(e, o, d), m = Math.min(e, o, d), O = (g + m) / 2, L = O, j = O;
    if (g == m)
      O = L = 0;
    else {
      let x = g - m;
      switch (L = j > 0.5 ? x / (2 - g - m) : x / (g + m), g) {
        case e:
          O = (o - d) / x + (o < d ? 6 : 0);
          break;
        case o:
          O = (d - e) / x + 2;
          break;
        case d:
          O = (e - o) / x + 4;
          break;
      }
      O /= 6;
    }
    return [O, L, j];
  }
  eq(e) {
    return this.r === e.r && this.g === e.g && this.b === e.b;
  }
  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  toHex() {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
  }
};
i(Z, "rgb");
var wr = i((r3, e, o) => X.fromHSL(r3, e, o), "hsl2rgb");
var re = class r3 {
  static {
    i(this, "Quad");
  }
  x = 0;
  y = 0;
  w = 1;
  h = 1;
  constructor(e, o, d, g) {
    this.x = e, this.y = o, this.w = d, this.h = g;
  }
  scale(e) {
    return new r3(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
  }
  pos() {
    return new y(this.x, this.y);
  }
  clone() {
    return new r3(this.x, this.y, this.w, this.h);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
  }
  toString() {
    return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
  }
};
i(oe, "quad");
var we = class r4 {
  static {
    i(this, "Mat4");
  }
  m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  constructor(e) {
    e && (this.m = e);
  }
  static translate(e) {
    return new r4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
  }
  static scale(e) {
    return new r4([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  static rotateX(e) {
    e = Re(-e);
    let o = Math.cos(e), d = Math.sin(e);
    return new r4([1, 0, 0, 0, 0, o, -d, 0, 0, d, o, 0, 0, 0, 0, 1]);
  }
  static rotateY(e) {
    e = Re(-e);
    let o = Math.cos(e), d = Math.sin(e);
    return new r4([o, 0, d, 0, 0, 1, 0, 0, -d, 0, o, 0, 0, 0, 0, 1]);
  }
  static rotateZ(e) {
    e = Re(-e);
    let o = Math.cos(e), d = Math.sin(e);
    return new r4([o, -d, 0, 0, d, o, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  translate(e) {
    return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
  }
  scale(e) {
    return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
  }
  rotate(e) {
    e = Re(-e);
    let o = Math.cos(e), d = Math.sin(e), g = this.m[0], m = this.m[1], O = this.m[4], L = this.m[5];
    return this.m[0] = g * o + m * d, this.m[1] = -g * d + m * o, this.m[4] = O * o + L * d, this.m[5] = -O * d + L * o, this;
  }
  mult(e) {
    let o = [];
    for (let d = 0;d < 4; d++)
      for (let g = 0;g < 4; g++)
        o[d * 4 + g] = this.m[0 * 4 + g] * e.m[d * 4 + 0] + this.m[1 * 4 + g] * e.m[d * 4 + 1] + this.m[2 * 4 + g] * e.m[d * 4 + 2] + this.m[3 * 4 + g] * e.m[d * 4 + 3];
    return new r4(o);
  }
  multVec2(e) {
    return new y(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
  }
  getTranslation() {
    return new y(this.m[12], this.m[13]);
  }
  getScale() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], o = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return new y(o, e / o);
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], o = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return new y(e / o, o);
    } else
      return new y(0, 0);
  }
  getRotation() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return nt(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return nt(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
    } else
      return 0;
  }
  getSkew() {
    if (this.m[0] != 0 || this.m[1] != 0) {
      let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
      return new y(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
    } else if (this.m[4] != 0 || this.m[5] != 0) {
      let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
      return new y(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
    } else
      return new y(0, 0);
  }
  invert() {
    let e = [], o = this.m[10] * this.m[15] - this.m[14] * this.m[11], d = this.m[9] * this.m[15] - this.m[13] * this.m[11], g = this.m[9] * this.m[14] - this.m[13] * this.m[10], m = this.m[8] * this.m[15] - this.m[12] * this.m[11], O = this.m[8] * this.m[14] - this.m[12] * this.m[10], L = this.m[8] * this.m[13] - this.m[12] * this.m[9], j = this.m[6] * this.m[15] - this.m[14] * this.m[7], x = this.m[5] * this.m[15] - this.m[13] * this.m[7], Y = this.m[5] * this.m[14] - this.m[13] * this.m[6], S = this.m[4] * this.m[15] - this.m[12] * this.m[7], q = this.m[4] * this.m[14] - this.m[12] * this.m[6], E = this.m[5] * this.m[15] - this.m[13] * this.m[7], z = this.m[4] * this.m[13] - this.m[12] * this.m[5], ee = this.m[6] * this.m[11] - this.m[10] * this.m[7], te = this.m[5] * this.m[11] - this.m[9] * this.m[7], _ = this.m[5] * this.m[10] - this.m[9] * this.m[6], C = this.m[4] * this.m[11] - this.m[8] * this.m[7], Ve = this.m[4] * this.m[10] - this.m[8] * this.m[6], be = this.m[4] * this.m[9] - this.m[8] * this.m[5];
    e[0] = this.m[5] * o - this.m[6] * d + this.m[7] * g, e[4] = -(this.m[4] * o - this.m[6] * m + this.m[7] * O), e[8] = this.m[4] * d - this.m[5] * m + this.m[7] * L, e[12] = -(this.m[4] * g - this.m[5] * O + this.m[6] * L), e[1] = -(this.m[1] * o - this.m[2] * d + this.m[3] * g), e[5] = this.m[0] * o - this.m[2] * m + this.m[3] * O, e[9] = -(this.m[0] * d - this.m[1] * m + this.m[3] * L), e[13] = this.m[0] * g - this.m[1] * O + this.m[2] * L, e[2] = this.m[1] * j - this.m[2] * x + this.m[3] * Y, e[6] = -(this.m[0] * j - this.m[2] * S + this.m[3] * q), e[10] = this.m[0] * E - this.m[1] * S + this.m[3] * z, e[14] = -(this.m[0] * Y - this.m[1] * q + this.m[2] * z), e[3] = -(this.m[1] * ee - this.m[2] * te + this.m[3] * _), e[7] = this.m[0] * ee - this.m[2] * C + this.m[3] * Ve, e[11] = -(this.m[0] * te - this.m[1] * C + this.m[3] * be), e[15] = this.m[0] * _ - this.m[1] * Ve + this.m[2] * be;
    let Xe = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
    for (let Pe = 0;Pe < 4; Pe++)
      for (let Ce = 0;Ce < 4; Ce++)
        e[Pe * 4 + Ce] *= 1 / Xe;
    return new r4(e);
  }
  clone() {
    return new r4([...this.m]);
  }
  toString() {
    return this.m.toString();
  }
};
i(Ln, "wave");
var gi = 1103515245;
var wi = 12345;
var pr = 2147483648;
var pt = class {
  static {
    i(this, "RNG");
  }
  seed;
  constructor(e) {
    this.seed = e;
  }
  gen() {
    return this.seed = (gi * this.seed + wi) % pr, this.seed / pr;
  }
  genNumber(e, o) {
    return e + this.gen() * (o - e);
  }
  genVec2(e, o) {
    return new y(this.genNumber(e.x, o.x), this.genNumber(e.y, o.y));
  }
  genColor(e, o) {
    return new X(this.genNumber(e.r, o.r), this.genNumber(e.g, o.g), this.genNumber(e.b, o.b));
  }
  genAny(...e) {
    if (e.length === 0)
      return this.gen();
    if (e.length === 1) {
      if (typeof e[0] == "number")
        return this.genNumber(0, e[0]);
      if (e[0] instanceof y)
        return this.genVec2(T(0, 0), e[0]);
      if (e[0] instanceof X)
        return this.genColor(Z(0, 0, 0), e[0]);
    } else if (e.length === 2) {
      if (typeof e[0] == "number" && typeof e[1] == "number")
        return this.genNumber(e[0], e[1]);
      if (e[0] instanceof y && e[1] instanceof y)
        return this.genVec2(e[0], e[1]);
      if (e[0] instanceof X && e[1] instanceof X)
        return this.genColor(e[0], e[1]);
    }
  }
};
var Gn = new pt(Date.now());
i(br, "randSeed");
i(bt, "rand");
i(In, "randi");
i(vr, "chance");
i(yr, "choose");
i(xr, "testRectRect");
i(bi, "testLineLineT");
i(tt, "testLineLine");
i(Ur, "testRectLine");
i(gt, "testRectPoint");
i(Er, "testLinePoint");
i(Vn, "testLineCircle");
i(Sr, "testCirclePoint");
i(Cr, "testCirclePolygon");
i(kn, "testPolygonPoint");
var Me = class r5 {
  static {
    i(this, "Line");
  }
  p1;
  p2;
  constructor(e, o) {
    this.p1 = e.clone(), this.p2 = o.clone();
  }
  transform(e) {
    return new r5(e.multVec2(this.p1), e.multVec2(this.p2));
  }
  bbox() {
    return ue.fromPoints(this.p1, this.p2);
  }
  area() {
    return this.p1.dist(this.p2);
  }
  clone() {
    return new r5(this.p1, this.p2);
  }
};
var ue = class r6 {
  static {
    i(this, "Rect");
  }
  pos;
  width;
  height;
  constructor(e, o, d) {
    this.pos = e.clone(), this.width = o, this.height = d;
  }
  static fromPoints(e, o) {
    return new r6(e.clone(), o.x - e.x, o.y - e.y);
  }
  center() {
    return new y(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
  }
  points() {
    return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
  }
  transform(e) {
    return new Ke(this.points().map((o) => e.multVec2(o)));
  }
  bbox() {
    return this.clone();
  }
  area() {
    return this.width * this.height;
  }
  clone() {
    return new r6(this.pos.clone(), this.width, this.height);
  }
  distToPoint(e) {
    return Math.sqrt(this.sdistToPoint(e));
  }
  sdistToPoint(e) {
    let o = this.pos, d = this.pos.add(this.width, this.height), g = Math.max(o.x - e.x, 0, e.x - d.x), m = Math.max(o.y - e.y, 0, e.y - d.y);
    return g * g + m * m;
  }
};
var wt = class r7 {
  static {
    i(this, "Circle");
  }
  center;
  radius;
  constructor(e, o) {
    this.center = e.clone(), this.radius = o;
  }
  transform(e) {
    return new Bn(this.center, this.radius, this.radius).transform(e);
  }
  bbox() {
    return ue.fromPoints(this.center.sub(T(this.radius)), this.center.add(T(this.radius)));
  }
  area() {
    return this.radius * this.radius * Math.PI;
  }
  clone() {
    return new r7(this.center, this.radius);
  }
};
var Bn = class r8 {
  static {
    i(this, "Ellipse");
  }
  center;
  radiusX;
  radiusY;
  constructor(e, o, d) {
    this.center = e.clone(), this.radiusX = o, this.radiusY = d;
  }
  transform(e) {
    return new r8(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
  }
  bbox() {
    return ue.fromPoints(this.center.sub(T(this.radiusX, this.radiusY)), this.center.add(T(this.radiusX, this.radiusY)));
  }
  area() {
    return this.radiusX * this.radiusY * Math.PI;
  }
  clone() {
    return new r8(this.center, this.radiusX, this.radiusY);
  }
};
var Ke = class r9 {
  static {
    i(this, "Polygon");
  }
  pts;
  constructor(e) {
    if (e.length < 3)
      throw new Error("Polygons should have at least 3 vertices");
    this.pts = e;
  }
  transform(e) {
    return new r9(this.pts.map((o) => e.multVec2(o)));
  }
  bbox() {
    let e = T(Number.MAX_VALUE), o = T(-Number.MAX_VALUE);
    for (let d of this.pts)
      e.x = Math.min(e.x, d.x), o.x = Math.max(o.x, d.x), e.y = Math.min(e.y, d.y), o.y = Math.max(o.y, d.y);
    return ue.fromPoints(e, o);
  }
  area() {
    let e = 0, o = this.pts.length;
    for (let d = 0;d < o; d++) {
      let g = this.pts[d], m = this.pts[(d + 1) % o];
      e += g.x * m.y * 0.5, e -= m.x * g.y * 0.5;
    }
    return Math.abs(e);
  }
  clone() {
    return new r9(this.pts.map((e) => e.clone()));
  }
};
i(Tr, "sat");
var vt = class extends Map {
  static {
    i(this, "IDList");
  }
  lastID;
  constructor(...e) {
    super(...e), this.lastID = 0;
  }
  push(e) {
    let o = this.lastID;
    return this.set(o, e), this.lastID++, o;
  }
  pushd(e) {
    let o = this.push(e);
    return () => this.delete(o);
  }
};
var Be = class r10 {
  static {
    i(this, "EventController");
  }
  paused = false;
  cancel;
  constructor(e) {
    this.cancel = e;
  }
  static join(e) {
    let o = new r10(() => e.forEach((d) => d.cancel()));
    return Object.defineProperty(o, "paused", { get: () => e[0].paused, set: (d) => e.forEach((g) => g.paused = d) }), o.paused = false, o;
  }
};
var me = class {
  static {
    i(this, "Event");
  }
  handlers = new vt;
  add(e) {
    let o = this.handlers.pushd((...g) => {
      d.paused || e(...g);
    }), d = new Be(o);
    return d;
  }
  addOnce(e) {
    let o = this.add((...d) => {
      o.cancel(), e(...d);
    });
    return o;
  }
  next() {
    return new Promise((e) => this.addOnce(e));
  }
  trigger(...e) {
    this.handlers.forEach((o) => o(...e));
  }
  numListeners() {
    return this.handlers.size;
  }
  clear() {
    this.handlers.clear();
  }
};
var Le = class {
  static {
    i(this, "EventHandler");
  }
  handlers = {};
  on(e, o) {
    return this.handlers[e] || (this.handlers[e] = new me), this.handlers[e].add(o);
  }
  onOnce(e, o) {
    let d = this.on(e, (...g) => {
      d.cancel(), o(...g);
    });
    return d;
  }
  next(e) {
    return new Promise((o) => {
      this.onOnce(e, (...d) => o(d[0]));
    });
  }
  trigger(e, ...o) {
    this.handlers[e] && this.handlers[e].trigger(...o);
  }
  remove(e) {
    delete this.handlers[e];
  }
  clear() {
    this.handlers = {};
  }
  numListeners(e) {
    return this.handlers[e]?.numListeners() ?? 0;
  }
};
i(qt, "deepEq");
i(vi, "base64ToArrayBuffer");
i(Nn, "dataURLToArrayBuffer");
i($t, "download");
i(jn, "downloadText");
i(Ar, "downloadJSON");
i(_n, "downloadBlob");
var Yt = i((r11) => r11.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
var Rr = i((r11) => r11.split(".").pop(), "getExt");
var Pr = (() => {
  let r11 = 0;
  return () => r11++;
})();
var Or = i((r11) => r11 instanceof Error ? r11.message : String(r11), "getErrorMessage");
var Ht = class {
  static {
    i(this, "BinaryHeap");
  }
  _items;
  _compareFn;
  constructor(e = (o, d) => o < d) {
    this._compareFn = e, this._items = [];
  }
  insert(e) {
    this._items.push(e), this.moveUp(this._items.length - 1);
  }
  remove() {
    if (this._items.length === 0)
      return null;
    let e = this._items[0], o = this._items.pop();
    return this._items.length !== 0 && (this._items[0] = o, this.moveDown(0)), e;
  }
  clear() {
    this._items.splice(0, this._items.length);
  }
  moveUp(e) {
    for (;e > 0; ) {
      let o = Math.floor((e - 1) / 2);
      if (!this._compareFn(this._items[e], this._items[o]) && this._items[e] >= this._items[o])
        break;
      this.swap(e, o), e = o;
    }
  }
  moveDown(e) {
    for (;e < Math.floor(this._items.length / 2); ) {
      let o = 2 * e + 1;
      if (o < this._items.length - 1 && !this._compareFn(this._items[o], this._items[o + 1]) && ++o, this._compareFn(this._items[e], this._items[o]))
        break;
      this.swap(e, o), e = o;
    }
  }
  swap(e, o) {
    [this._items[e], this._items[o]] = [this._items[o], this._items[e]];
  }
  get length() {
    return this._items.length;
  }
};
var Hn = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
var rt = class {
  static {
    i(this, "ButtonState");
  }
  pressed = new Set([]);
  pressedRepeat = new Set([]);
  released = new Set([]);
  down = new Set([]);
  update() {
    this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
  }
  press(e) {
    this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
  }
  pressRepeat(e) {
    this.pressedRepeat.add(e);
  }
  release(e) {
    this.down.delete(e), this.pressed.delete(e), this.released.add(e);
  }
};
var qn = class {
  static {
    i(this, "GamepadState");
  }
  buttonState = new rt;
  stickState = new Map;
};
var $n = class {
  static {
    i(this, "FPSCounter");
  }
  dts = [];
  timer = 0;
  fps = 0;
  tick(e) {
    this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((o, d) => o + d) / this.dts.length)), this.dts = []);
  }
};
var Mr = i((r11) => {
  if (!r11.canvas)
    throw new Error("Please provide a canvas");
  let e = { canvas: r11.canvas, loopID: null, stopped: false, dt: 0, time: 0, realTime: 0, fpsCounter: new $n, timeScale: 1, skipTime: false, numFrames: 0, mousePos: new y(0), mouseDeltaPos: new y(0), keyState: new rt, mouseState: new rt, mergedGamepadState: new qn, gamepadStates: new Map, gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: r11.canvas.offsetWidth, lastHeight: r11.canvas.offsetHeight, events: new Le };
  function o() {
    return e.canvas;
  }
  i(o, "canvas");
  function d() {
    return e.dt * e.timeScale;
  }
  i(d, "dt");
  function g() {
    return e.time;
  }
  i(g, "time");
  function m() {
    return e.fpsCounter.fps;
  }
  i(m, "fps");
  function O() {
    return e.numFrames;
  }
  i(O, "numFrames");
  function L() {
    return e.canvas.toDataURL();
  }
  i(L, "screenshot");
  function j(h) {
    e.canvas.style.cursor = h;
  }
  i(j, "setCursor");
  function x() {
    return e.canvas.style.cursor;
  }
  i(x, "getCursor");
  function Y(h) {
    if (h)
      try {
        let v = e.canvas.requestPointerLock();
        v.catch && v.catch((R) => console.error(R));
      } catch (v) {
        console.error(v);
      }
    else
      document.exitPointerLock();
  }
  i(Y, "setCursorLocked");
  function S() {
    return !!document.pointerLockElement;
  }
  i(S, "isCursorLocked");
  function q(h) {
    h.requestFullscreen ? h.requestFullscreen() : h.webkitRequestFullscreen && h.webkitRequestFullscreen();
  }
  i(q, "enterFullscreen");
  function E() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
  }
  i(E, "exitFullscreen");
  function z() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }
  i(z, "getFullscreenElement");
  function ee(h = true) {
    h ? q(e.canvas) : E();
  }
  i(ee, "setFullscreen");
  function te() {
    return !!z();
  }
  i(te, "isFullscreen");
  function _() {
    e.stopped = true;
    for (let h in H)
      e.canvas.removeEventListener(h, H[h]);
    for (let h in xe)
      document.removeEventListener(h, xe[h]);
    for (let h in ve)
      window.removeEventListener(h, ve[h]);
    Gt.disconnect();
  }
  i(_, "quit");
  function C(h) {
    e.loopID !== null && cancelAnimationFrame(e.loopID);
    let v = 0, R = i((k) => {
      if (e.stopped)
        return;
      if (document.visibilityState !== "visible") {
        e.loopID = requestAnimationFrame(R);
        return;
      }
      let ae = k / 1000, W = ae - e.realTime, Ee = r11.maxFPS ? 1 / r11.maxFPS : 0;
      e.realTime = ae, v += W, v > Ee && (e.skipTime || (e.dt = v, e.time += d(), e.fpsCounter.tick(e.dt)), v = 0, e.skipTime = false, e.numFrames++, Ft(), h(), wn()), e.loopID = requestAnimationFrame(R);
    }, "frame");
    R(0);
  }
  i(C, "run");
  function Ve() {
    return ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
  }
  i(Ve, "isTouchscreen");
  function be() {
    return e.mousePos.clone();
  }
  i(be, "mousePos");
  function Xe() {
    return e.mouseDeltaPos.clone();
  }
  i(Xe, "mouseDeltaPos");
  function Pe(h = "left") {
    return e.mouseState.pressed.has(h);
  }
  i(Pe, "isMousePressed");
  function Ce(h = "left") {
    return e.mouseState.down.has(h);
  }
  i(Ce, "isMouseDown");
  function en(h = "left") {
    return e.mouseState.released.has(h);
  }
  i(en, "isMouseReleased");
  function tn() {
    return e.isMouseMoved;
  }
  i(tn, "isMouseMoved");
  function We(h) {
    return h === undefined ? e.keyState.pressed.size > 0 : e.keyState.pressed.has(h);
  }
  i(We, "isKeyPressed");
  function nn(h) {
    return h === undefined ? e.keyState.pressedRepeat.size > 0 : e.keyState.pressedRepeat.has(h);
  }
  i(nn, "isKeyPressedRepeat");
  function Je(h) {
    return h === undefined ? e.keyState.down.size > 0 : e.keyState.down.has(h);
  }
  i(Je, "isKeyDown");
  function rn(h) {
    return h === undefined ? e.keyState.released.size > 0 : e.keyState.released.has(h);
  }
  i(rn, "isKeyReleased");
  function sn(h) {
    return h === undefined ? e.mergedGamepadState.buttonState.pressed.size > 0 : e.mergedGamepadState.buttonState.pressed.has(h);
  }
  i(sn, "isGamepadButtonPressed");
  function Ut(h) {
    return h === undefined ? e.mergedGamepadState.buttonState.down.size > 0 : e.mergedGamepadState.buttonState.down.has(h);
  }
  i(Ut, "isGamepadButtonDown");
  function Et(h) {
    return h === undefined ? e.mergedGamepadState.buttonState.released.size > 0 : e.mergedGamepadState.buttonState.released.has(h);
  }
  i(Et, "isGamepadButtonReleased");
  function St(h) {
    return e.events.on("resize", h);
  }
  i(St, "onResize");
  let _e = i((h, v) => {
    if (typeof h == "function")
      return e.events.on("keyDown", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("keyDown", (R) => R === h && v(h));
  }, "onKeyDown"), on = i((h, v) => {
    if (typeof h == "function")
      return e.events.on("keyPress", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("keyPress", (R) => R === h && v(h));
  }, "onKeyPress"), an = i((h, v) => {
    if (typeof h == "function")
      return e.events.on("keyPressRepeat", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("keyPressRepeat", (R) => R === h && v(h));
  }, "onKeyPressRepeat"), un = i((h, v) => {
    if (typeof h == "function")
      return e.events.on("keyRelease", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("keyRelease", (R) => R === h && v(h));
  }, "onKeyRelease");
  function cn(h, v) {
    return typeof h == "function" ? e.events.on("mouseDown", (R) => h(R)) : e.events.on("mouseDown", (R) => R === h && v(R));
  }
  i(cn, "onMouseDown");
  function hn(h, v) {
    return typeof h == "function" ? e.events.on("mousePress", (R) => h(R)) : e.events.on("mousePress", (R) => R === h && v(R));
  }
  i(hn, "onMousePress");
  function ln(h, v) {
    return typeof h == "function" ? e.events.on("mouseRelease", (R) => h(R)) : e.events.on("mouseRelease", (R) => R === h && v(R));
  }
  i(ln, "onMouseRelease");
  function Ct(h) {
    return e.events.on("mouseMove", () => h(be(), Xe()));
  }
  i(Ct, "onMouseMove");
  function Tt(h) {
    return e.events.on("charInput", h);
  }
  i(Tt, "onCharInput");
  function At(h) {
    return e.events.on("touchStart", h);
  }
  i(At, "onTouchStart");
  function Rt(h) {
    return e.events.on("touchMove", h);
  }
  i(Rt, "onTouchMove");
  function Pt(h) {
    return e.events.on("touchEnd", h);
  }
  i(Pt, "onTouchEnd");
  function dn(h) {
    return e.events.on("scroll", h);
  }
  i(dn, "onScroll");
  function at(h) {
    return e.events.on("hide", h);
  }
  i(at, "onHide");
  function fn(h) {
    return e.events.on("show", h);
  }
  i(fn, "onShow");
  function mn(h, v) {
    if (typeof h == "function")
      return e.events.on("gamepadButtonDown", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("gamepadButtonDown", (R) => R === h && v(h));
  }
  i(mn, "onGamepadButtonDown");
  function Ot(h, v) {
    if (typeof h == "function")
      return e.events.on("gamepadButtonPress", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("gamepadButtonPress", (R) => R === h && v(h));
  }
  i(Ot, "onGamepadButtonPress");
  function pn(h, v) {
    if (typeof h == "function")
      return e.events.on("gamepadButtonRelease", h);
    if (typeof h == "string" && typeof v == "function")
      return e.events.on("gamepadButtonRelease", (R) => R === h && v(h));
  }
  i(pn, "onGamepadButtonRelease");
  function Mt(h, v) {
    return e.events.on("gamepadStick", (R, k) => R === h && v(k));
  }
  i(Mt, "onGamepadStick");
  function Dt(h) {
    e.events.on("gamepadConnect", h);
  }
  i(Dt, "onGamepadConnect");
  function ut(h) {
    e.events.on("gamepadDisconnect", h);
  }
  i(ut, "onGamepadDisconnect");
  function gn(h) {
    return e.mergedGamepadState.stickState.get(h) || new y(0);
  }
  i(gn, "getGamepadStick");
  function ct() {
    return [...e.charInputted];
  }
  i(ct, "charInputted");
  function Ue() {
    return [...e.gamepads];
  }
  i(Ue, "getGamepads");
  function Ft() {
    e.events.trigger("input"), e.keyState.down.forEach((h) => e.events.trigger("keyDown", h)), e.mouseState.down.forEach((h) => e.events.trigger("mouseDown", h)), vn();
  }
  i(Ft, "processInput");
  function wn() {
    e.keyState.update(), e.mouseState.update(), e.mergedGamepadState.buttonState.update(), e.mergedGamepadState.stickState.forEach((h, v) => {
      e.mergedGamepadState.stickState.set(v, new y(0));
    }), e.charInputted = [], e.isMouseMoved = false, e.gamepadStates.forEach((h) => {
      h.buttonState.update(), h.stickState.forEach((v, R) => {
        h.stickState.set(R, new y(0));
      });
    });
  }
  i(wn, "resetInput");
  function ht(h) {
    let v = { index: h.index, isPressed: (R) => e.gamepadStates.get(h.index).buttonState.pressed.has(R), isDown: (R) => e.gamepadStates.get(h.index).buttonState.down.has(R), isReleased: (R) => e.gamepadStates.get(h.index).buttonState.released.has(R), getStick: (R) => e.gamepadStates.get(h.index).stickState.get(R) };
    return e.gamepads.push(v), e.gamepadStates.set(h.index, { buttonState: new rt, stickState: new Map([["left", new y(0)], ["right", new y(0)]]) }), v;
  }
  i(ht, "registerGamepad");
  function bn(h) {
    e.gamepads = e.gamepads.filter((v) => v.index !== h.index), e.gamepadStates.delete(h.index);
  }
  i(bn, "removeGamepad");
  function vn() {
    for (let h of navigator.getGamepads())
      h && !e.gamepadStates.has(h.index) && ht(h);
    for (let h of e.gamepads) {
      let v = navigator.getGamepads()[h.index], k = (r11.gamepads ?? {})[v.id] ?? Hn[v.id] ?? Hn.default, ae = e.gamepadStates.get(h.index);
      for (let W = 0;W < v.buttons.length; W++)
        v.buttons[W].pressed ? (ae.buttonState.down.has(k.buttons[W]) || (e.mergedGamepadState.buttonState.press(k.buttons[W]), ae.buttonState.press(k.buttons[W]), e.events.trigger("gamepadButtonPress", k.buttons[W])), e.events.trigger("gamepadButtonDown", k.buttons[W])) : ae.buttonState.down.has(k.buttons[W]) && (e.mergedGamepadState.buttonState.release(k.buttons[W]), ae.buttonState.release(k.buttons[W]), e.events.trigger("gamepadButtonRelease", k.buttons[W]));
      for (let W in k.sticks) {
        let Ee = k.sticks[W], ye = new y(v.axes[Ee.x], v.axes[Ee.y]);
        ae.stickState.set(W, ye), e.mergedGamepadState.stickState.set(W, ye), e.events.trigger("gamepadStick", W, ye);
      }
    }
  }
  i(vn, "processGamepad");
  let H = {}, xe = {}, ve = {}, de = r11.pixelDensity || window.devicePixelRatio || 1;
  H.mousemove = (h) => {
    let v = new y(h.offsetX, h.offsetY), R = new y(h.movementX, h.movementY);
    if (te()) {
      let k = e.canvas.width / de, ae = e.canvas.height / de, W = window.innerWidth, Ee = window.innerHeight, ye = W / Ee, Bt = k / ae;
      if (ye > Bt) {
        let Te = Ee / ae, Qe = (W - k * Te) / 2;
        v.x = Ge(h.offsetX - Qe, 0, k * Te, 0, k), v.y = Ge(h.offsetY, 0, ae * Te, 0, ae);
      } else {
        let Te = W / k, Qe = (Ee - ae * Te) / 2;
        v.x = Ge(h.offsetX, 0, k * Te, 0, k), v.y = Ge(h.offsetY - Qe, 0, ae * Te, 0, ae);
      }
    }
    e.events.onOnce("input", () => {
      e.isMouseMoved = true, e.mousePos = v, e.mouseDeltaPos = R, e.events.trigger("mouseMove");
    });
  };
  let le = ["left", "middle", "right", "back", "forward"];
  H.mousedown = (h) => {
    e.events.onOnce("input", () => {
      let v = le[h.button];
      v && (e.mouseState.press(v), e.events.trigger("mousePress", v));
    });
  }, H.mouseup = (h) => {
    e.events.onOnce("input", () => {
      let v = le[h.button];
      v && (e.mouseState.release(v), e.events.trigger("mouseRelease", v));
    });
  };
  let ke = new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), He = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
  H.keydown = (h) => {
    ke.has(h.key) && h.preventDefault(), e.events.onOnce("input", () => {
      let v = He[h.key] || h.key.toLowerCase();
      v.length === 1 ? (e.events.trigger("charInput", v), e.charInputted.push(v)) : v === "space" && (e.events.trigger("charInput", " "), e.charInputted.push(" ")), h.repeat ? (e.keyState.pressRepeat(v), e.events.trigger("keyPressRepeat", v)) : (e.keyState.press(v), e.events.trigger("keyPressRepeat", v), e.events.trigger("keyPress", v));
    });
  }, H.keyup = (h) => {
    e.events.onOnce("input", () => {
      let v = He[h.key] || h.key.toLowerCase();
      e.keyState.release(v), e.events.trigger("keyRelease", v);
    });
  }, H.touchstart = (h) => {
    h.preventDefault(), e.events.onOnce("input", () => {
      let v = [...h.changedTouches], R = e.canvas.getBoundingClientRect();
      r11.touchToMouse !== false && (e.mousePos = new y(v[0].clientX - R.x, v[0].clientY - R.y), e.mouseState.press("left"), e.events.trigger("mousePress", "left")), v.forEach((k) => {
        e.events.trigger("touchStart", new y(k.clientX - R.x, k.clientY - R.y), k);
      });
    });
  }, H.touchmove = (h) => {
    h.preventDefault(), e.events.onOnce("input", () => {
      let v = [...h.changedTouches], R = e.canvas.getBoundingClientRect();
      r11.touchToMouse !== false && (e.mousePos = new y(v[0].clientX - R.x, v[0].clientY - R.y), e.events.trigger("mouseMove")), v.forEach((k) => {
        e.events.trigger("touchMove", new y(k.clientX - R.x, k.clientY - R.y), k);
      });
    });
  }, H.touchend = (h) => {
    e.events.onOnce("input", () => {
      let v = [...h.changedTouches], R = e.canvas.getBoundingClientRect();
      r11.touchToMouse !== false && (e.mousePos = new y(v[0].clientX - R.x, v[0].clientY - R.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), v.forEach((k) => {
        e.events.trigger("touchEnd", new y(k.clientX - R.x, k.clientY - R.y), k);
      });
    });
  }, H.touchcancel = (h) => {
    e.events.onOnce("input", () => {
      let v = [...h.changedTouches], R = e.canvas.getBoundingClientRect();
      r11.touchToMouse !== false && (e.mousePos = new y(v[0].clientX - R.x, v[0].clientY - R.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), v.forEach((k) => {
        e.events.trigger("touchEnd", new y(k.clientX - R.x, k.clientY - R.y), k);
      });
    });
  }, H.wheel = (h) => {
    h.preventDefault(), e.events.onOnce("input", () => {
      e.events.trigger("scroll", new y(h.deltaX, h.deltaY));
    });
  }, H.contextmenu = (h) => h.preventDefault(), xe.visibilitychange = () => {
    document.visibilityState === "visible" ? (e.skipTime = true, e.events.trigger("show")) : e.events.trigger("hide");
  }, ve.gamepadconnected = (h) => {
    let v = ht(h.gamepad);
    e.events.onOnce("input", () => {
      e.events.trigger("gamepadConnect", v);
    });
  }, ve.gamepaddisconnected = (h) => {
    let v = Ue().filter((R) => R.index === h.gamepad.index)[0];
    bn(h.gamepad), e.events.onOnce("input", () => {
      e.events.trigger("gamepadDisconnect", v);
    });
  };
  for (let h in H)
    e.canvas.addEventListener(h, H[h]);
  for (let h in xe)
    document.addEventListener(h, xe[h]);
  for (let h in ve)
    window.addEventListener(h, ve[h]);
  let Gt = new ResizeObserver((h) => {
    for (let v of h)
      if (v.target === e.canvas) {
        if (e.lastWidth === e.canvas.offsetWidth && e.lastHeight === e.canvas.offsetHeight)
          return;
        e.lastWidth = e.canvas.offsetWidth, e.lastHeight = e.canvas.offsetHeight, e.events.onOnce("input", () => {
          e.events.trigger("resize");
        });
      }
  });
  return Gt.observe(e.canvas), { dt: d, time: g, run: C, canvas: o, fps: m, numFrames: O, quit: _, setFullscreen: ee, isFullscreen: te, setCursor: j, screenshot: L, getGamepads: Ue, getCursor: x, setCursorLocked: Y, isCursorLocked: S, isTouchscreen: Ve, mousePos: be, mouseDeltaPos: Xe, isKeyDown: Je, isKeyPressed: We, isKeyPressedRepeat: nn, isKeyReleased: rn, isMouseDown: Ce, isMousePressed: Pe, isMouseReleased: en, isMouseMoved: tn, isGamepadButtonPressed: sn, isGamepadButtonDown: Ut, isGamepadButtonReleased: Et, getGamepadStick: gn, charInputted: ct, onResize: St, onKeyDown: _e, onKeyPress: on, onKeyPressRepeat: an, onKeyRelease: un, onMouseDown: cn, onMousePress: hn, onMouseRelease: ln, onMouseMove: Ct, onCharInput: Tt, onTouchStart: At, onTouchMove: Rt, onTouchEnd: Pt, onScroll: dn, onHide: at, onShow: fn, onGamepadButtonDown: mn, onGamepadButtonPress: Ot, onGamepadButtonRelease: pn, onGamepadStick: Mt, onGamepadConnect: Dt, onGamepadDisconnect: ut, events: e.events };
}, "default");
var Se = class r11 {
  static {
    i(this, "Texture");
  }
  ctx;
  src = null;
  glTex;
  width;
  height;
  constructor(e, o, d, g = {}) {
    this.ctx = e;
    let m = e.gl;
    this.glTex = e.gl.createTexture(), e.onDestroy(() => this.free()), this.width = o, this.height = d;
    let O = { linear: m.LINEAR, nearest: m.NEAREST }[g.filter] ?? m.NEAREST, L = { repeat: m.REPEAT, clampToEadge: m.CLAMP_TO_EDGE }[g.wrap] ?? m.CLAMP_TO_EDGE;
    this.bind(), o && d && m.texImage2D(m.TEXTURE_2D, 0, m.RGBA, o, d, 0, m.RGBA, m.UNSIGNED_BYTE, null), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MIN_FILTER, O), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, O), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_S, L), m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_T, L), this.unbind();
  }
  static fromImage(e, o, d = {}) {
    let g = new r11(e, o.width, o.height, d);
    return g.update(o), g.src = o, g;
  }
  update(e, o = 0, d = 0) {
    let g = this.ctx.gl;
    this.bind(), g.texSubImage2D(g.TEXTURE_2D, 0, o, d, g.RGBA, g.UNSIGNED_BYTE, e), this.unbind();
  }
  bind() {
    this.ctx.pushTexture(this.ctx.gl.TEXTURE_2D, this.glTex);
  }
  unbind() {
    this.ctx.popTexture(this.ctx.gl.TEXTURE_2D);
  }
  free() {
    this.ctx.gl.deleteTexture(this.glTex);
  }
};
var st = class {
  static {
    i(this, "FrameBuffer");
  }
  ctx;
  tex;
  glFramebuffer;
  glRenderbuffer;
  constructor(e, o, d, g = {}) {
    this.ctx = e;
    let m = e.gl;
    e.onDestroy(() => this.free()), this.tex = new Se(e, o, d, g), this.glFramebuffer = m.createFramebuffer(), this.glRenderbuffer = m.createRenderbuffer(), this.bind(), m.renderbufferStorage(m.RENDERBUFFER, m.DEPTH_STENCIL, o, d), m.framebufferTexture2D(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, m.TEXTURE_2D, this.tex.glTex, 0), m.framebufferRenderbuffer(m.FRAMEBUFFER, m.DEPTH_STENCIL_ATTACHMENT, m.RENDERBUFFER, this.glRenderbuffer), this.unbind();
  }
  get width() {
    return this.tex.width;
  }
  get height() {
    return this.tex.height;
  }
  toImageData() {
    let e = this.ctx.gl, o = new Uint8ClampedArray(this.width * this.height * 4);
    this.bind(), e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, o), this.unbind();
    let d = this.width * 4, g = new Uint8Array(d);
    for (let m = 0;m < (this.height / 2 | 0); m++) {
      let O = m * d, L = (this.height - m - 1) * d;
      g.set(o.subarray(O, O + d)), o.copyWithin(O, L, L + d), o.set(g, L);
    }
    return new ImageData(o, this.width, this.height);
  }
  toDataURL() {
    let e = document.createElement("canvas"), o = e.getContext("2d");
    return e.width = this.width, e.height = this.height, o.putImageData(this.toImageData(), 0, 0), e.toDataURL();
  }
  draw(e) {
    this.bind(), e(), this.unbind();
  }
  bind() {
    let e = this.ctx.gl;
    this.ctx.pushFramebuffer(e.FRAMEBUFFER, this.glFramebuffer), this.ctx.pushRenderbuffer(e.RENDERBUFFER, this.glRenderbuffer);
  }
  unbind() {
    let e = this.ctx.gl;
    this.ctx.popFramebuffer(e.FRAMEBUFFER), this.ctx.popRenderbuffer(e.RENDERBUFFER);
  }
  free() {
    let e = this.ctx.gl;
    e.deleteFramebuffer(this.glFramebuffer), e.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
  }
};
var Kt = class {
  static {
    i(this, "Shader");
  }
  ctx;
  glProgram;
  constructor(e, o, d, g) {
    this.ctx = e, e.onDestroy(() => this.free());
    let m = e.gl, O = m.createShader(m.VERTEX_SHADER), L = m.createShader(m.FRAGMENT_SHADER);
    m.shaderSource(O, o), m.shaderSource(L, d), m.compileShader(O), m.compileShader(L);
    let j = m.createProgram();
    if (this.glProgram = j, m.attachShader(j, O), m.attachShader(j, L), g.forEach((x, Y) => m.bindAttribLocation(j, Y, x)), m.linkProgram(j), !m.getProgramParameter(j, m.LINK_STATUS)) {
      let x = m.getShaderInfoLog(O);
      if (x)
        throw new Error("VERTEX SHADER " + x);
      let Y = m.getShaderInfoLog(L);
      if (Y)
        throw new Error("FRAGMENT SHADER " + Y);
    }
    m.deleteShader(O), m.deleteShader(L);
  }
  bind() {
    this.ctx.gl.useProgram(this.glProgram);
  }
  unbind() {
    this.ctx.gl.useProgram(null);
  }
  send(e) {
    let o = this.ctx.gl;
    for (let d in e) {
      let g = e[d], m = o.getUniformLocation(this.glProgram, d);
      typeof g == "number" ? o.uniform1f(m, g) : g instanceof we ? o.uniformMatrix4fv(m, false, new Float32Array(g.m)) : g instanceof X ? o.uniform3f(m, g.r, g.g, g.b) : g instanceof y && o.uniform2f(m, g.x, g.y);
    }
  }
  free() {
    this.ctx.gl.deleteProgram(this.glProgram);
  }
};
var Xt = class {
  static {
    i(this, "BatchRenderer");
  }
  ctx;
  glVBuf;
  glIBuf;
  vqueue = [];
  iqueue = [];
  stride;
  maxVertices;
  maxIndices;
  vertexFormat;
  numDraws = 0;
  curPrimitive = null;
  curTex = null;
  curShader = null;
  curUniform = {};
  constructor(e, o, d, g) {
    let m = e.gl;
    this.vertexFormat = o, this.ctx = e, this.stride = o.reduce((O, L) => O + L.size, 0), this.maxVertices = d, this.maxIndices = g, this.glVBuf = m.createBuffer(), e.pushBuffer(m.ARRAY_BUFFER, this.glVBuf), m.bufferData(m.ARRAY_BUFFER, d * 4, m.DYNAMIC_DRAW), e.popBuffer(m.ARRAY_BUFFER), this.glIBuf = m.createBuffer(), e.pushBuffer(m.ELEMENT_ARRAY_BUFFER, this.glIBuf), m.bufferData(m.ELEMENT_ARRAY_BUFFER, g * 4, m.DYNAMIC_DRAW), e.popBuffer(m.ELEMENT_ARRAY_BUFFER);
  }
  push(e, o, d, g, m = null, O = {}) {
    (e !== this.curPrimitive || m !== this.curTex || g !== this.curShader || !qt(this.curUniform, O) || this.vqueue.length + o.length * this.stride > this.maxVertices || this.iqueue.length + d.length > this.maxIndices) && this.flush();
    let L = this.vqueue.length / this.stride;
    for (let j of o)
      this.vqueue.push(j);
    for (let j of d)
      this.iqueue.push(j + L);
    this.curPrimitive = e, this.curShader = g, this.curTex = m, this.curUniform = O;
  }
  flush() {
    if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0)
      return;
    let e = this.ctx.gl;
    this.ctx.pushBuffer(e.ARRAY_BUFFER, this.glVBuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushBuffer(e.ELEMENT_ARRAY_BUFFER, this.glIBuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), this.curTex?.bind(), e.drawElements(this.curPrimitive, this.iqueue.length, e.UNSIGNED_SHORT, 0), this.curTex?.unbind(), this.curShader.unbind(), this.ctx.popBuffer(e.ARRAY_BUFFER), this.ctx.popBuffer(e.ELEMENT_ARRAY_BUFFER), this.vqueue = [], this.iqueue = [], this.numDraws++;
  }
  free() {
    let e = this.ctx.gl;
    e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
  }
};
i(zt, "genBinder");
var Dr = i((r12) => {
  let e = zt(r12.bindTexture.bind(r12)), o = zt(r12.bindBuffer.bind(r12)), d = zt(r12.bindFramebuffer.bind(r12)), g = zt(r12.bindRenderbuffer.bind(r12)), m = [];
  function O(Y) {
    m.push(Y);
  }
  i(O, "onDestroy");
  function L() {
    m.forEach((Y) => Y()), r12.getExtension("WEBGL_lose_context").loseContext();
  }
  i(L, "destroy");
  let j = null;
  function x(Y) {
    if (qt(Y, j))
      return;
    j = Y;
    let S = Y.reduce((q, E) => q + E.size, 0);
    Y.reduce((q, E, z) => (r12.vertexAttribPointer(z, E.size, r12.FLOAT, false, S * 4, q), r12.enableVertexAttribArray(z), q + E.size * 4), 0);
  }
  return i(x, "setVertexFormat"), { gl: r12, onDestroy: O, destroy: L, pushTexture: e.push, popTexture: e.pop, pushBuffer: o.push, popBuffer: o.pop, pushFramebuffer: d.push, popFramebuffer: d.pop, pushRenderbuffer: g.push, popRenderbuffer: g.pop, setVertexFormat: x };
}, "default");
var it = class {
  static {
    i(this, "TexPacker");
  }
  tex;
  canvas;
  c2d;
  x = 0;
  y = 0;
  curHeight = 0;
  gfx;
  constructor(e, o, d) {
    this.gfx = e, this.canvas = document.createElement("canvas"), this.canvas.width = o, this.canvas.height = d, this.tex = Se.fromImage(e, this.canvas), this.c2d = this.canvas.getContext("2d");
  }
  add(e) {
    if (e.width > this.canvas.width || e.height > this.canvas.height)
      throw new Error(`Texture size (${e.width} x ${e.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
    this.x + e.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + e.height > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = Se.fromImage(this.gfx, this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
    let o = new y(this.x, this.y);
    return this.x += e.width, e.height > this.curHeight && (this.curHeight = e.height), e instanceof ImageData ? this.c2d.putImageData(e, o.x, o.y) : this.c2d.drawImage(e, o.x, o.y), this.tex.update(this.canvas), [this.tex, new re(o.x / this.canvas.width, o.y / this.canvas.height, e.width / this.canvas.width, e.height / this.canvas.height)];
  }
};
var pe = class r12 {
  static {
    i(this, "Asset");
  }
  loaded = false;
  data = null;
  error = null;
  onLoadEvents = new me;
  onErrorEvents = new me;
  onFinishEvents = new me;
  constructor(e) {
    e.then((o) => {
      this.data = o, this.onLoadEvents.trigger(o);
    }).catch((o) => {
      if (this.error = o, this.onErrorEvents.numListeners() > 0)
        this.onErrorEvents.trigger(o);
      else
        throw o;
    }).finally(() => {
      this.onFinishEvents.trigger(), this.loaded = true;
    });
  }
  static loaded(e) {
    let o = new r12(Promise.resolve(e));
    return o.data = e, o.loaded = true, o;
  }
  onLoad(e) {
    return this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this;
  }
  onError(e) {
    return this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e), this;
  }
  onFinish(e) {
    return this.loaded ? e() : this.onFinishEvents.add(e), this;
  }
  then(e) {
    return this.onLoad(e);
  }
  catch(e) {
    return this.onError(e);
  }
  finally(e) {
    return this.onFinish(e);
  }
};
var Ie = class {
  static {
    i(this, "AssetBucket");
  }
  assets = new Map;
  lastUID = 0;
  add(e, o) {
    let d = e ?? this.lastUID++ + "", g = new pe(o);
    return this.assets.set(d, g), g;
  }
  addLoaded(e, o) {
    let d = e ?? this.lastUID++ + "", g = pe.loaded(o);
    return this.assets.set(d, g), g;
  }
  get(e) {
    return this.assets.get(e);
  }
  progress() {
    if (this.assets.size === 0)
      return 1;
    let e = 0;
    return this.assets.forEach((o) => {
      o.loaded && e++;
    }), e / this.assets.size;
  }
};
var Wt = 2.5949095;
var Fr = 1.70158 + 1;
var Gr = 2 * Math.PI / 3;
var Br = 2 * Math.PI / 4.5;
var Jt = { linear: (r13) => r13, easeInSine: (r13) => 1 - Math.cos(r13 * Math.PI / 2), easeOutSine: (r13) => Math.sin(r13 * Math.PI / 2), easeInOutSine: (r13) => -(Math.cos(Math.PI * r13) - 1) / 2, easeInQuad: (r13) => r13 * r13, easeOutQuad: (r13) => 1 - (1 - r13) * (1 - r13), easeInOutQuad: (r13) => r13 < 0.5 ? 2 * r13 * r13 : 1 - Math.pow(-2 * r13 + 2, 2) / 2, easeInCubic: (r13) => r13 * r13 * r13, easeOutCubic: (r13) => 1 - Math.pow(1 - r13, 3), easeInOutCubic: (r13) => r13 < 0.5 ? 4 * r13 * r13 * r13 : 1 - Math.pow(-2 * r13 + 2, 3) / 2, easeInQuart: (r13) => r13 * r13 * r13 * r13, easeOutQuart: (r13) => 1 - Math.pow(1 - r13, 4), easeInOutQuart: (r13) => r13 < 0.5 ? 8 * r13 * r13 * r13 * r13 : 1 - Math.pow(-2 * r13 + 2, 4) / 2, easeInQuint: (r13) => r13 * r13 * r13 * r13 * r13, easeOutQuint: (r13) => 1 - Math.pow(1 - r13, 5), easeInOutQuint: (r13) => r13 < 0.5 ? 16 * r13 * r13 * r13 * r13 * r13 : 1 - Math.pow(-2 * r13 + 2, 5) / 2, easeInExpo: (r13) => r13 === 0 ? 0 : Math.pow(2, 10 * r13 - 10), easeOutExpo: (r13) => r13 === 1 ? 1 : 1 - Math.pow(2, -10 * r13), easeInOutExpo: (r13) => r13 === 0 ? 0 : r13 === 1 ? 1 : r13 < 0.5 ? Math.pow(2, 20 * r13 - 10) / 2 : (2 - Math.pow(2, -20 * r13 + 10)) / 2, easeInCirc: (r13) => 1 - Math.sqrt(1 - Math.pow(r13, 2)), easeOutCirc: (r13) => Math.sqrt(1 - Math.pow(r13 - 1, 2)), easeInOutCirc: (r13) => r13 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * r13, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * r13 + 2, 2)) + 1) / 2, easeInBack: (r13) => Fr * r13 * r13 * r13 - 1.70158 * r13 * r13, easeOutBack: (r13) => 1 + Fr * Math.pow(r13 - 1, 3) + 1.70158 * Math.pow(r13 - 1, 2), easeInOutBack: (r13) => r13 < 0.5 ? Math.pow(2 * r13, 2) * ((Wt + 1) * 2 * r13 - Wt) / 2 : (Math.pow(2 * r13 - 2, 2) * ((Wt + 1) * (r13 * 2 - 2) + Wt) + 2) / 2, easeInElastic: (r13) => r13 === 0 ? 0 : r13 === 1 ? 1 : -Math.pow(2, 10 * r13 - 10) * Math.sin((r13 * 10 - 10.75) * Gr), easeOutElastic: (r13) => r13 === 0 ? 0 : r13 === 1 ? 1 : Math.pow(2, -10 * r13) * Math.sin((r13 * 10 - 0.75) * Gr) + 1, easeInOutElastic: (r13) => r13 === 0 ? 0 : r13 === 1 ? 1 : r13 < 0.5 ? -(Math.pow(2, 20 * r13 - 10) * Math.sin((20 * r13 - 11.125) * Br)) / 2 : Math.pow(2, -20 * r13 + 10) * Math.sin((20 * r13 - 11.125) * Br) / 2 + 1, easeInBounce: (r13) => 1 - Jt.easeOutBounce(1 - r13), easeOutBounce: (r13) => r13 < 1 / 2.75 ? 7.5625 * r13 * r13 : r13 < 2 / 2.75 ? 7.5625 * (r13 -= 1.5 / 2.75) * r13 + 0.75 : r13 < 2.5 / 2.75 ? 7.5625 * (r13 -= 2.25 / 2.75) * r13 + 0.9375 : 7.5625 * (r13 -= 2.625 / 2.75) * r13 + 0.984375, easeInOutBounce: (r13) => r13 < 0.5 ? (1 - Jt.easeOutBounce(1 - 2 * r13)) / 2 : (1 + Jt.easeOutBounce(2 * r13 - 1)) / 2 };
var yt = Jt;
var xt = class {
  static {
    i(this, "Timer");
  }
  time;
  action;
  finished = false;
  paused = false;
  constructor(e, o) {
    this.time = e, this.action = o;
  }
  tick(e) {
    return this.finished || this.paused ? false : (this.time -= e, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
  }
  reset(e) {
    this.time = e, this.finished = false;
  }
};
var Lr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
var Ir = mr("SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlrXV///XTGbm7Kbx0ymcRX///x7GVvquf5vk/dPs0Wi5Td1vggDxqbNII4bAPTU3Ix5h9FJTe7zv1LHG/uPsPrvth0ejchVzVT3giirs6sQAACgQAAIAdaXbRAYra/2t0//3HwqLKIlBOJhOg4BzAOkt+MOL6H8nlNvKyi3rOnqP//zf6AATwBAKIcHKixxwjl1TjDVIrvTqdmKQOFQBUBDwZ1EhHlDEGEVyGQWBAHrcJgRSXYbkvHK/8/6rbYjs4Qj0C8mRy2hwRv/82opGT55fROgRoBTjanaiQiMRHUu1/P3V9yGFffaVv78U1/6l/kpo0cz73vuSv/9GeaqDVRA5bWdHRKQKIEAAAAoIktKeEmdQFKN5sguv/ZSC0oxCAR7CzcJgEsd8cA0M/x0tzv15E7//5L5KCqoIAAmBFIKM1UxYtMMFjLKESTE8lhaelUyCBYeA2IN4rK1iDt//+5JkEgAkZzlVq29D8DJDWo0YLLARwPFZrL0PyLsUazTAlpI+hKSx01VSOfbjXg0iW9/jVPDleLJ15QQA4Okdc5ByMDFIeuCCE5CvevwBGH8YibiX9FtaIIgUikF42wrZw6ZJ6WlHrA+Ki5++NNMeYH1lEkwwJAIJB4ugVFguXFc20Vd/FLlvq1GSiSwAFABABABA47k6BFeNvxEQZO9v3L1IE4iEVElfrXmEmlyWIyGslFA55gH/sW7////o9AAFIBIIAAIUMzYTTNkgsAmYObfwQyzplrOmYvq0BKCKNN+nUTbvD7cJzvHxrEWG5QqvP8U1vFx6CwE8NoRc2ADBeEb/HoXh60N7ST8nw9QiiGoYvf/r6GtC9+vLwXHjaSkIp3iupC5+Nii81Zhu85pNYbFvrf+UFThDOYYY26off+W6b//73GTiN9xDfl0AAwBAiMBO8qsDBPOZtuT/dTbjVVbY/KSGH6ppHwKv/6X+s8gUCN/lODzv////GQAGAMQAADlXAUCBJiY0wFQZusYQOaQzaTwDBTcx0IvVp8m7uxKp//uSZBMCBHRI1eNPLHAyxNqWGeoYUIEnWYyxD8DUFSn0l6iojcd+oEOkzV6uWqyHNzjqmv+7V5xGUfY9yEmbziTzjRscm9OqFQp1PKFrqu3PX/7YuGtDU6bt0OUTpv38rdc+37dVDQLKUchaJ853E9edNDGqWwsYz1VoiSStEJtZvw6+sNqFWqaIXJjQCGAAGWAYVwmag/x3BRJw1wYF7IzVqDcNzn85d//FzK7IgwbQwccLoB4AsF8Nj/1ESRUAAVJwAFh0YOFEhmSJEHKQRDyhszgLUpHIgFrb5cySFg5jv10ImlYuvaaGBItfXqnNPmic+XNkmb5fW49vdhq97nQMQyGIlM2v8oQSrxKSxE4F1WqrduqvuJCRof1R7Gsre9KszUVF1/t3PzH2tnp+iSUG3rDwGNcDzxCGA8atuQF0paZAAkAhAQAEAC240yJV+nJgUrqq8axAYtVpYjZyFGb13/17jwiClQDaCdytZpyHHf1R/EG/+lUAgAAAChhmJvioVGGBCFgqdpsGAkUUrbTstwTCJgLQpFIsELW7t/68Iv/7kmQUgAQ9NFO9aeAAPAU6RKwUABClY2e5hoARGpDvPydCAsY8WO10fSvUOnfT98+n/l/6/+hxslhQ1DEOaevNKGocvIYba8WJpaP/15pX0NQ1DUNn/////k6lPp/N61rBi8RJFfERV3IgrqDsJA64sjCoKxDDQ9xEcWDpMBDwVFDIAEIAAzryxsjGi4q/oWpixKjhklAF4pUrDPjFhFVupDFZ/t/t0YPAygUBhADPR/KLCKJ8h2Oxhpxz/zNRAAFl0MAZLAYEAiVbEiz36LSgZ5QoQVat69KNy8FyM5Z80ACHAzgnISEkxUSJIDyBSwi5KF4mjBl4xJdbrG9ComLrL8YATiodhQKCkj6ROdyg1y5XmZlvMVmpJzYppJDwLi/Lp9vT3TfmimOGpuezi2U/9FNav0zX9Oja2r//8+hvuihuQAAMAVmqFgAgCcuboAEAAAUcqy8ca0BHBmwbFkED0CNA1YYDPkhcQrRJxcY3BzfxxltAz9vX62Xl3plAzWmRO+FkZyH///1qAAEjQBAACUpgU5o2AIBmFBGMamrGg0b/+5JkC4ADxyLWb2ngAEEkGofsoACP7U1JLaxTkOqFaKhspGgnW3SGC56ZgUJGCRnLOmIJAkuNBgvwU4Ocf8CJK9UsafH9/Frj///365XSoME+DZMw5UNjrMbVoeIj9EL91IuQ5KHyl5V2LCpdIdESgafOHxVGkAlkHuakmix/gN8+BP/sKguLAAoAtUjtvaoeEADwr3OK11E4KBlojgeQNQBJ4MvCAd/4t/xMMzeLhQGQ1//6tQu5BaBOGCT6U4aafvXZ//4iAPAAAAbLkgIlQmMSLA2H1CVNAlWwyVvKIQIxOSK1NWxs4MBUATlKrAkIMPAjCAdS6MVFzuURWa/+/qQWEGsA6EEpiBEJb9Q21lAHoBoD0B6aAPhyt+bG3muoXIN3RLadXxUfr/ohjGFF/p97eqNI5noKAqYLNPpUTDSI9/TmA6B+YAAADgA0Y4lxTW1SQfOQuDDDI0KTTuIrF5qoJrUFhUFAsg+AT2hbkaRZYGIjBKVDIa5VgNN/9P/rCDsBJbYJRKpCA1ArAkigIeYY61AjE+jubyiZFZ3+L789//uSZBCABHVj2entNmw1JXokLycYEFTFVa0wz4DYjKs08J2Q+r4n3lgbWaaMwMLEjFW88F39brqPF83cv1mCSJeY3Q2uiQxhBJxCBeR1D2LQRsYQcZUTzdNll8+OwZBsIwSgl45ymaHX603Mz7JmZuvt71GDTN66zev/+cLn/b5imV8pAHkg61FIJchBSG+zycgAZgADD6F1iQQRXRWmWS6bDIIgyBCZEcdl/KgXGmVKFv/vl8ry/5bLypf//U5jhYDhL9X/pAA0AKBIAAKgGtGXGGWJgEoF2JNsHlKfSKLRhGBAgIuWZKIJCFpF1VBhkB+EfzEyMUJdWuMrEZoPZ5BfF3/Nu62riIdjoO4AAKD2sTrDmpZZaYysf/810TitAVvn9xtFucieiaEy54YqiIO6RqkGAm5wVO0bFB0sDTdNxYGekKktR4KAAfAwUIgI8Ci6aXgtwbhPWAC+CKExAFydNtYGXNZoQjUsXv/9vKjgmdwieb+h7kHvPoc//0FaCACAATKFC4Y9ammklidbaiJNPBhGWTNhFSgdtalK12lpl//7kmQRAFN2NFI7TBvwNKNaTRsFGBWdfV2tPNcYvBHpgPKJsc8IUcTCxY3HSvUVNTWe/Z3YWlrJ0yrNRUiT19aprA7E+mPP+ZmC3/CsheOJXhc/9VJb3UZnphUBcqZUZQth1i3XqtPYu2Sy1s8DV9ZYACAAASAAHgFkQcOqgB5utFHFh3kSi4USs0yk4iOClREmjvdG+upaiLcRA6/9QGbOfxF/8sEAQAVG0G07YFMihKR4EXJCkRdX9isueLqUMRAQdhDZmv3KeR0nPqRVrZmSIXDt+BBSR7qqbKQcB98W9qiMb55preHIStxFWPE4lAyI+BKz2iSxonpvMR5DgKxTH6vGGXAbYCaAnJUW4W07EesQqbfqdbo4qNnPxSpn1H8eahszc/y9//dn1V7D/OYpn1szQKAPXTMlO/rO//u7JriJXbld7aP33v6RXYg/COIDzTWkTspg6Ay1YaDSwKxrP/LfIikHjmO871POf/kEAseAgoPEi9/0ZziNwfxVKy9qAEGEEAAq1EcOamDEGHAA0iao8k31rz2MiLNEik6VQ37/+5JkEAgEYU5WU0M3MDjDe0o9IjiOzSVM7aCzEM2GqXD8pFB0zxMcHCQNHtZD+R+pMWZxOJ/otEZTvVN/MeU12xTVcL+f2YaiNJTVoPd6SvzEnKel5GXOzEaazgdChnP2jOAwpfyRpVlQwoJBwpN1L1DL////6TVWcoepf7CVWrpEWiym5lR5U0BSMlxQC4qByOyQIAEuJfIriWixDqRgMfVZWuvRowjR9BzP5lZlT/+YG50CsSBG////////liXDQVMxEaBkbzKAAACnDIAstY7iK7gGSF7SIDexaTtPOHABk9YcmJEACmo50pgWal22etroBpYoVqtU6OPqvlf0c4QCAfLk9P/FJs4KCQMf6ECZyA6BwqqyJ0rMYj56k1/UlTIx1V3Rt5NF71D4qlptDC8VMgQVHFDlQnDFi06qQgKQAAIK4TxxJGFGYJuZNGXRdpq7IW/DYpPIQRFJLAc+qn1E0XYdOkQVJT+z8Lvff//8vbKAWTIBBUUdM6cOhlDry7x4dAkJXIBhbO3HSMMMGBQ9K9/JNfu09PjTO64wYEcR//uSZBeABP5g11NPRVwzQ4r8PMJVj7j9UU2wUwDPjeq0Z5w675D9+uDdL2QsuIry2lZtwn/pJYyRRjANEOQxNWw8mU7Tq+vueV7JrX/Pg7VIkEuZT5dwd85MVoq5lpStNICkBAcFR88//58KO8Zjt2PIGxWl1cVfXeNGH18SReNT//hYliWtQuNluxyxONbm4U+lpkAgpyE7yAIYUjIaqHmARJ0GQTtmH60xdwFp/u253XBCxD0f/lBcguCALn//Y5nqEv//1h4BAAwgAA5gcHmpIplgeW9fAOM6RFZUywrsGAiRmKkanQnCFBjYoPDS7bjwtPTkVI8D/P8VVLcTUz65n7PW2s3tNYHgEul4tBaIz0A9RgJAyAMI4/i0fpQKjhX9S+qIa0vmc4CZit/0/3UTDGeKNpkk0nu2rUE2ag8WErhE/kgAiQCJKQEYBA5Wn6CxHoIUh6dQ46nLIuwFk4S/LaDQxXu7Yf/pf//lwJB0S/Ff/4C///EiBEiAAAIAMnpngiIABAdMpKigkXaUwhLEGvpiofmXW57h2XAZO3CMRv/7kmQUAEOHQlHraRTQMkQp6GWFZBTVU1lNPTPYyIyocYeUoNgLBWAs1jPkTv/tXBaeZ/tbD/nAGP8/xT0SNEi5zof0KIVEzVe9r5lZOol7kyaXMYS4J/ZS3djp//UaeVyR0mUMlTgfz8XqMzIEgAQQ6UNQ1DSE0/C16OvyaocF4ijAGFci0FSYqCUSaWs6t9F6/699DKvMgMoK1//kSbvxtyBN27I7mdXgNMAW75sRU1UwUHYG5axI2tFIFpkgx7nnK+1JmRKjqeAd5Ph0QAL4QAnirmiPlg0yBDlrb/d3ngtA65rb999+8vdDCfnJuJAYIl285zklpVbrKpk1PEzrOY9NZUgyz6OiOsKt5qG/g2ibxSZ+/eTI/NB8n4ev//n2nIw85GAdwuJL7kYnnAbpcf1RBKH6b2U4RWP8dmWH5snsAFYwADBgAopKdzFJq4Jlmotloh/m4QpTSvJRE3nYZHephoqBhVf+P7vQ9BPlwZCP+3//+hdy5uUwS3LDEgQx4cdIgvDEBR1YqymCsSbKzRy2aQmSv+AAcAgAkvzPfuX/+5JkFQAj6VFX00Zr5DllOhhgpn4MmSs+zSRRiO8U5tWklYgSLKfs+Xheb/+6WaAQCKTztNeJ382MUltZNnjSJoFrCqB6C4mFcwJpJD4Oc8dLDXMTh9k1/rmTopfzqv9AvHWfOuZJlEvHSVMjyjpkVucKSzxJVQBgAAIo8DGqRdYCXPckFYg+dH9A/qUyljrtpxH9RJX/Z3Vv6uFkPg4M2jf3CL09QrwOrMt69n//8UFEAAMHWdhg1CcjyVBwiArOYlDL5NPY6x8ZLFBCGi6SVTKX5nqdSEFjebnv2zHdt0dj6xvORsSFzwqRNTJSZIrrlpXcURNL9WW7krBgr5jPMaGcvJ5v0N1s19CV7+7fvQfjySX2QECWUgKgeJCIif4WRBZ/6archpDkzE7oWctK3zEHP9Smeai8oeHkM6AK7pGjtOgeFv40ugqNd+Iv///uAZAMgAAAUeSWhLPpdwk3iXpBw43hOVIp1gliUOSaeZcZeZhLAH9TtD56wUpBduzLF5v5qViTH6o+I0+8Z1asaLgKVAohlpB72DgAQBQxEd3g//uSZCiAA6k0UdMPQfA+xcnBYON8E3WDVU0w1ZjPDSmo8IniHAFDNnkXF3B94gicH5d8MFw+IHZwufxOf/8gsHw+XrD4Jn8T4RAyQiABNBQg/3giEWuZ42mVFB3kkXNjhqBg1CghEUbN3/7/KBhyqNueef/MIDBClP3YRnKLiIlEFzf//0g+4zKpRIKTpqQgUtnHGFw6RSLN421iGcYapqFxny/capK9r9v+2BSy/RU1yZxa2eGaWK07ijfcxeiO3iuHJvjbXzts+Ny+XyFnsne1h0qG4mAaN6xRGaLVxKPlrri0Bg9oXGyxcw8JRBPkUzC8v451vVd9liSX85JMrmkVNwxOCwUg298////7ks//L409/hwMRIozKiIckXtjzDaAMTBcAACAwLGargPSEgEJZN/EFjfF/VKgaMYKMbwtf/T0UCGGfjfOAZ2frCigYdwh/+sGlQBxhCAAAUHkDPqOdmmUdAVYl3IhrEfR8qZFjLYEPOyzVGvm6lNUJCk2PNazwFxaijk+ZEaiTehoJGuDh6zN/EVP8BCLD/88BoY7Xv/7kmQlgBNmMtNTL0FwOGZJ/WHiKAyhJU+soE3A3JnmAa2oaCIru/+RrEHMTphxQ0X/LzoVy4gKhYl6ZUlklW7CLRVoYmgABwCRMAAMA/poCiEEYLsBVodWcVZ18+CcAfH165U4Xgh7/X1/BAQF6GN/BwQ/+D9S9P6wII//CoANYFYCBAKlGQDKhVjjylKARw2mPAtp8JjcQHggQswVsOEKsF6AIBWvmpIFdSZvRVv/LHWEy0+txMxu+VK9gEqG5pWf6GNGU4UBVkfd+bsj/6lZE0fkOpAqAOvyUO9oo+IiEtcLKOGzhhSGa4MYINHWoQsFr8zzmow0tRILkqz5/+vFxl/oZX/+qGW//xiLjR3xcGn//0QLkTQJh1UA8MAQAEXC/YxODKTDUEhrASs1512GRp+dRFFdTWIRaOXrve1eNjTNpreqQYrC9NBlQc1f8YO2po8bnH6qffuRvU7taiNF3baokE0YpmjRCHRclWBb9NCHKHpERwHRG3pqgXklq4sBpLjGvmekg8Y7SjM1FZopIM8IhB6dtMr8aKsdovh4FW//+5JkQ4CjTDdSU0gtIDiE+YBrKgwNbSVJTCBPwN8N5ZW8NKDnhRB8AXCm//KAsBUCwKU//oJQnET+UP3/zpYRocAAABJkVzzIuoLGEaDoxfsNva12EUdxhJMGFQioSg8GxKsLm8kWEmExJuNidarkk+OTXc0i2OZEq2v+tZr/MDZRS0I7LfRpHdlsiF6m/mEjk+XlK10UqtKYUwNgMx24hUtCJLfpM3ExUeKDYjClgZAzAjQ0qlNQBTsGpk9zSRkCiKkRGp572VXsPYChGvxhAuYkDYZK//jSRgto2mTf6+PJqgAAgIAAAACYZE6aZOHhYkYlcbpeYQq1RgLO4U8TIlL1sGw+iKZi5Kzc/bKT0yXrIUMES89RCWy8oWlxqIQlKANLFpT/KjUrK+UCYbZqGnjVj29aO5dzofWAskRX5eJWPi4kf/aRVjy3Wlyg2AnMYIDSTLwZUTASIzflPWUwwlUnIFMnGiyABeaXJcN91PmQJCLzmvUJkFOHCrX/+6O///IHnT4tT9YYBoNMQ09GfKIErwdwChNz1Qy5+5S/wWeY//uSZF+C03UyT2tMO0A3RRkhY20KzQjDMszhA8DjlGOBp5y4ZCS3ica52GIGiryv7FAaSDVZSXKFTiir+GvGiuK4rjgwPVTddso+W/42a4ueJJHDYtfj6YoKknnjzRgKA0fBIRZOSsprJqnoNN73ps/Z9DVgbKNbMGmRzrYBMAZCPUANkAZQ0syAC2ubK1NF90+WoesBpnhY8qwVDkNb/5Uof6//418TgElCSgAIgyAAQBHEmiaQFPIRmfAMELffpo0IflyEuAAQnSnKvwTlVlnIgOAAGS3P3IydjXPSh/CaVRqpSNCjQqDvPM+fLcuN+WgqNix6CoHomUWTT86JjziRSZ3yjnq+dIldKPU11KUuf6wAASMAAJxE+MlyktgE9UGSxjEx6RR0v1s9bWZ+EJSrGtjqUIhklG3J8eLRn/2U/nv7f///+7/6gBQgEAMUijVMwweWWMyYM/PLXuc7DptIQmBARMRCxXjEIcTNDQgSSeHpUNXO7dRSOllJPvnY7yzaO1hmUjsKvHe99fOxrabMX7mGTi5tsNkZVZLndzxse//7kmR7ABM2O0pbKTvQN4NI+WGFPA2ZESs1pYAAvA0jVrJwAHfbr/c6//vW790dzX36QNBRlDv/6QQAU3V64yUgBEAYc/lI8e5bm+Z9+j+4aaj4tFrb//iker/4a12b/V//q//9v+7vAEAAAAMqZTGd5gL4f54o6ZebKNrR/zWVYUEVYVVv8BuAV2OUT+DUQgkJ8J1Ey4ZbFCiAwgwzMSdHV4jQR+OoPWEASaPkyYq+PsQFFJCsEEJtOiUjI/+GRhtC2DnizTMXATJig9Ey/kAJMrkHGYJ8gpLjmJOYoskpav+ShRJInyGGZVJMihDi6pIxRZJJel/8iZPkYiREnyKE0akTL5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
var Vr = "data:image/png;base64,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";
var kr = "data:image/png;base64,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";
var Ci = "3000.1.13";
var Nr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var Qt = "topleft";
var jr = 64;
var Ti = "monospace";
var Zt = "monospace";
var Ai = 36;
var _r = 64;
var Hr = 256;
var qr = 2048;
var $r = 2048;
var Yr = 2048;
var zr = 2048;
var Kr = 0.1;
var Ri = 64;
var Yn = "nearest";
var Pi = 8;
var Oi = 4;
var Xn = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
var Mi = Xn.reduce((r13, e) => r13 + e.size, 0);
var Xr = 2048;
var Di = Xr * 4 * Mi;
var Fi = Xr * 6;
var Gi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
var Bi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
var zn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
var Kn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
var Li = new Set(["id", "require"]);
var Ii = new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
i(ot, "anchorPt");
i(Vi, "alignPt");
i(ki, "createEmptyAudioBuffer");
var Lo = i((r13 = {}) => {
  let e = r13.root ?? document.body;
  e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
  let o = r13.canvas ?? (() => {
    let t = document.createElement("canvas");
    return e.appendChild(t), t;
  })(), d = r13.scale ?? 1, g = r13.width && r13.height && !r13.stretch && !r13.letterbox;
  g ? (o.width = r13.width * d, o.height = r13.height * d) : (o.width = o.parentElement.offsetWidth, o.height = o.parentElement.offsetHeight);
  let m = ["outline: none", "cursor: default"];
  if (g) {
    let { width: t, height: n } = o;
    m.push(`width: ${t}px`), m.push(`height: ${n}px`);
  } else
    m.push("width: 100%"), m.push("height: 100%");
  r13.crisp && (m.push("image-rendering: pixelated"), m.push("image-rendering: crisp-edges")), o.style.cssText = m.join(";");
  let O = r13.pixelDensity || window.devicePixelRatio;
  o.width *= O, o.height *= O, o.tabIndex = 0;
  let L = document.createElement("canvas");
  L.width = Hr, L.height = Hr;
  let j = L.getContext("2d", { willReadFrequently: true }), x = Mr({ canvas: o, touchToMouse: r13.touchToMouse, gamepads: r13.gamepads, pixelDensity: r13.pixelDensity, maxFPS: r13.maxFPS }), Y = [], S = x.canvas().getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true }), q = Dr(S), E = (() => {
    let t = ut(zn, Kn), n = Se.fromImage(q, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), s = r13.width && r13.height ? new st(q, r13.width * O * d, r13.height * O * d) : new st(q, S.drawingBufferWidth, S.drawingBufferHeight), a = null, u = 1;
    r13.background && (a = X.fromArray(r13.background), u = r13.background[3] ?? 1, S.clearColor(a.r / 255, a.g / 255, a.b / 255, u)), S.enable(S.BLEND), S.blendFuncSeparate(S.SRC_ALPHA, S.ONE_MINUS_SRC_ALPHA, S.ONE, S.ONE_MINUS_SRC_ALPHA);
    let c = new Xt(q, Xn, Di, Fi), f = Se.fromImage(q, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
    return { lastDrawCalls: 0, defShader: t, defTex: n, frameBuffer: s, postShader: null, postShaderUniform: null, renderer: c, transform: new we, transformStack: [], bgTex: f, bgColor: a, bgAlpha: u, width: r13.width ?? S.drawingBufferWidth / O / d, height: r13.height ?? S.drawingBufferHeight / O / d, viewport: { x: 0, y: 0, width: S.drawingBufferWidth, height: S.drawingBufferHeight }, fixed: false };
  })();

  class z {
    static {
      i(this, "SpriteData");
    }
    tex;
    frames = [new re(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(n, s, a = {}, u = null) {
      this.tex = n, s && (this.frames = s), this.anims = a, this.slice9 = u;
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(n, s = {}) {
      return typeof n == "string" ? z.fromURL(n, s) : Promise.resolve(z.fromImage(n, s));
    }
    static fromImage(n, s = {}) {
      let [a, u] = _.packer.add(n), c = s.frames ? s.frames.map((f) => new re(u.x + f.x * u.w, u.y + f.y * u.h, f.w * u.w, f.h * u.h)) : Ut(s.sliceX || 1, s.sliceY || 1, u.x, u.y, u.w, u.h);
      return new z(a, c, s.anims, s.slice9);
    }
    static fromURL(n, s = {}) {
      return We(n).then((a) => z.fromImage(a, s));
    }
  }

  class ee {
    static {
      i(this, "SoundData");
    }
    buf;
    constructor(n) {
      this.buf = n;
    }
    static fromArrayBuffer(n) {
      return new Promise((s, a) => te.ctx.decodeAudioData(n, s, a)).then((s) => new ee(s));
    }
    static fromURL(n) {
      return Yt(n) ? ee.fromArrayBuffer(Nn(n)) : tn(n).then((s) => ee.fromArrayBuffer(s));
    }
  }
  let te = (() => {
    let t = new (window.AudioContext || window.webkitAudioContext), n = t.createGain();
    n.connect(t.destination);
    let s = new ee(ki(t));
    return t.decodeAudioData(Ir.buffer.slice(0)).then((a) => {
      s.buf = a;
    }).catch((a) => {
      console.error("Failed to load burp: ", a);
    }), { ctx: t, masterNode: n, burpSnd: s };
  })(), _ = { urlPrefix: "", sprites: new Ie, fonts: new Ie, bitmapFonts: new Ie, sounds: new Ie, shaders: new Ie, custom: new Ie, packer: new it(q, Yr, zr), loaded: false }, C = { events: new Le, objEvents: new Le, root: xn([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new y(1), angle: 0, shake: 0, transform: new we } };
  C.root.use(Cn());
  function Ve(t) {
    return _.custom.add(null, t);
  }
  i(Ve, "load");
  function be() {
    let t = [_.sprites, _.sounds, _.shaders, _.fonts, _.bitmapFonts, _.custom];
    return t.reduce((n, s) => n + s.progress(), 0) / t.length;
  }
  i(be, "loadProgress");
  function Xe(t) {
    return t !== undefined && (_.urlPrefix = t), _.urlPrefix;
  }
  i(Xe, "loadRoot");
  function Pe(t) {
    let n = _.urlPrefix + t;
    return fetch(n).then((s) => {
      if (!s.ok)
        throw new Error(`Failed to fetch "${n}"`);
      return s;
    });
  }
  i(Pe, "fetchURL");
  function Ce(t) {
    return Pe(t).then((n) => n.json());
  }
  i(Ce, "fetchJSON");
  function en(t) {
    return Pe(t).then((n) => n.text());
  }
  i(en, "fetchText");
  function tn(t) {
    return Pe(t).then((n) => n.arrayBuffer());
  }
  i(tn, "fetchArrayBuffer");
  function We(t) {
    let n = new Image;
    return n.crossOrigin = "anonymous", n.src = Yt(t) ? t : _.urlPrefix + t, new Promise((s, a) => {
      n.onload = () => s(n), n.onerror = () => a(new Error(`Failed to load image from "${t}"`));
    });
  }
  i(We, "loadImg");
  function nn(t, n) {
    return _.custom.add(t, Ce(n));
  }
  i(nn, "loadJSON");

  class Je {
    static {
      i(this, "FontData");
    }
    fontface;
    filter = Yn;
    outline = null;
    constructor(n, s = {}) {
      this.fontface = n, this.filter = s.filter ?? Yn, s.outline && (this.outline = { width: 1, color: Z(0, 0, 0) }, typeof s.outline == "number" ? this.outline.width = s.outline : typeof s.outline == "object" && (s.outline.width && (this.outline.width = s.outline.width), s.outline.color && (this.outline.color = s.outline.color)));
    }
  }
  function rn(t, n, s = {}) {
    let a = new FontFace(t, typeof n == "string" ? `url(${n})` : n);
    return document.fonts.add(a), _.fonts.add(t, a.load().catch((u) => {
      throw new Error(`Failed to load font from "${n}": ${u}`);
    }).then((u) => new Je(u, s)));
  }
  i(rn, "loadFont");
  function sn(t, n, s, a, u = {}) {
    return _.bitmapFonts.add(t, We(n).then((c) => gn(Se.fromImage(q, c, u), s, a, u.chars ?? Nr)));
  }
  i(sn, "loadBitmapFont");
  function Ut(t = 1, n = 1, s = 0, a = 0, u = 1, c = 1) {
    let f = [], b = u / t, p = c / n;
    for (let l = 0;l < n; l++)
      for (let w = 0;w < t; w++)
        f.push(new re(s + w * b, a + l * p, b, p));
    return f;
  }
  i(Ut, "slice");
  function Et(t, n) {
    return Ve(typeof n == "string" ? new Promise((s, a) => {
      Ce(n).then((u) => {
        Et(t, u).then(s).catch(a);
      });
    }) : z.from(t).then((s) => {
      let a = {};
      for (let u in n) {
        let c = n[u], f = s.frames[0], b = Yr * f.w, p = zr * f.h, l = c.frames ? c.frames.map((A) => new re(f.x + (c.x + A.x) / b * f.w, f.y + (c.y + A.y) / p * f.h, A.w / b * f.w, A.h / p * f.h)) : Ut(c.sliceX || 1, c.sliceY || 1, f.x + c.x / b * f.w, f.y + c.y / p * f.h, c.width / b * f.w, c.height / p * f.h), w = new z(s.tex, l, c.anims);
        _.sprites.addLoaded(u, w), a[u] = w;
      }
      return a;
    }));
  }
  i(Et, "loadSpriteAtlas");
  function St(t, n = {}) {
    let s = document.createElement("canvas"), a = t[0].width, u = t[0].height;
    s.width = a * t.length, s.height = u;
    let c = s.getContext("2d");
    t.forEach((b, p) => {
      b instanceof ImageData ? c.putImageData(b, p * a, 0) : c.drawImage(b, p * a, 0);
    });
    let f = c.getImageData(0, 0, t.length * a, u);
    return z.fromImage(f, { ...n, sliceX: t.length, sliceY: 1 });
  }
  i(St, "createSpriteSheet");
  function _e(t, n, s = { sliceX: 1, sliceY: 1, anims: {} }) {
    return Array.isArray(n) ? n.some((a) => typeof a == "string") ? _.sprites.add(t, Promise.all(n.map((a) => typeof a == "string" ? We(a) : Promise.resolve(a))).then((a) => St(a, s))) : _.sprites.addLoaded(t, St(n, s)) : typeof n == "string" ? _.sprites.add(t, z.from(n, s)) : _.sprites.addLoaded(t, z.fromImage(n, s));
  }
  i(_e, "loadSprite");
  function on(t, n) {
    return _.sprites.add(t, new Promise(async (s) => {
      let a = typeof n == "string" ? await Ce(n) : n, u = await Promise.all(a.frames.map(We)), c = document.createElement("canvas");
      c.width = a.width, c.height = a.height * a.frames.length;
      let f = c.getContext("2d");
      u.forEach((p, l) => {
        f.drawImage(p, 0, l * a.height);
      });
      let b = await _e(null, c, { sliceY: a.frames.length, anims: a.anims });
      s(b);
    }));
  }
  i(on, "loadPedit");
  function an(t, n, s) {
    typeof n == "string" && !s && (s = n.replace(new RegExp(`${Rr(n)}\$`), "json"));
    let a = typeof s == "string" ? Ce(s) : Promise.resolve(s);
    return _.sprites.add(t, a.then((u) => {
      let c = u.meta.size, f = u.frames.map((p) => new re(p.frame.x / c.w, p.frame.y / c.h, p.frame.w / c.w, p.frame.h / c.h)), b = {};
      for (let p of u.meta.frameTags)
        p.from === p.to ? b[p.name] = p.from : b[p.name] = { from: p.from, to: p.to, speed: 10, loop: true, pingpong: p.direction === "pingpong" };
      return z.from(n, { frames: f, anims: b });
    }));
  }
  i(an, "loadAseprite");
  function un(t, n, s) {
    return _.shaders.addLoaded(t, ut(n, s));
  }
  i(un, "loadShader");
  function cn(t, n, s) {
    let a = i((c) => c ? en(c) : Promise.resolve(null), "resolveUrl"), u = Promise.all([a(n), a(s)]).then(([c, f]) => ut(c, f));
    return _.shaders.add(t, u);
  }
  i(cn, "loadShaderURL");
  function hn(t, n) {
    return _.sounds.add(t, typeof n == "string" ? ee.fromURL(n) : ee.fromArrayBuffer(n));
  }
  i(hn, "loadSound");
  function ln(t = "bean") {
    return _e(t, Lr);
  }
  i(ln, "loadBean");
  function Ct(t) {
    return _.sprites.get(t);
  }
  i(Ct, "getSprite");
  function Tt(t) {
    return _.sounds.get(t);
  }
  i(Tt, "getSound");
  function At(t) {
    return _.fonts.get(t);
  }
  i(At, "getFont");
  function Rt(t) {
    return _.bitmapFonts.get(t);
  }
  i(Rt, "getBitmapFont");
  function Pt(t) {
    return _.shaders.get(t);
  }
  i(Pt, "getShader");
  function dn(t) {
    return _.custom.get(t);
  }
  i(dn, "getAsset");
  function at(t) {
    if (typeof t == "string") {
      let n = Ct(t);
      if (n)
        return n;
      if (be() < 1)
        return null;
      throw new Error(`Sprite not found: ${t}`);
    } else {
      if (t instanceof z)
        return pe.loaded(t);
      if (t instanceof pe)
        return t;
      throw new Error(`Invalid sprite: ${t}`);
    }
  }
  i(at, "resolveSprite");
  function fn(t) {
    if (typeof t == "string") {
      let n = Tt(t);
      if (n)
        return n;
      if (be() < 1)
        return null;
      throw new Error(`Sound not found: ${t}`);
    } else {
      if (t instanceof ee)
        return pe.loaded(t);
      if (t instanceof pe)
        return t;
      throw new Error(`Invalid sound: ${t}`);
    }
  }
  i(fn, "resolveSound");
  function mn(t) {
    if (!t)
      return E.defShader;
    if (typeof t == "string") {
      let n = Pt(t);
      if (n)
        return n.data ?? n;
      if (be() < 1)
        return null;
      throw new Error(`Shader not found: ${t}`);
    } else if (t instanceof pe)
      return t.data ? t.data : t;
    return t;
  }
  i(mn, "resolveShader");
  function Ot(t) {
    if (!t)
      return Ot(r13.font ?? Ti);
    if (typeof t == "string") {
      let n = Rt(t), s = At(t);
      if (n)
        return n.data ?? n;
      if (s)
        return s.data ?? s;
      if (document.fonts.check(`${_r}px ${t}`))
        return t;
      if (be() < 1)
        return null;
      throw new Error(`Font not found: ${t}`);
    } else if (t instanceof pe)
      return t.data ? t.data : t;
    return t;
  }
  i(Ot, "resolveFont");
  function pn(t) {
    return t !== undefined && (te.masterNode.gain.value = t), te.masterNode.gain.value;
  }
  i(pn, "volume");
  function Mt(t, n = {}) {
    let s = te.ctx, a = n.paused ?? false, u = s.createBufferSource(), c = new me, f = s.createGain(), b = n.seek ?? 0, p = 0, l = 0, w = false;
    u.loop = !!n.loop, u.detune.value = n.detune ?? 0, u.playbackRate.value = n.speed ?? 1, u.connect(f), u.onended = () => {
      N() >= u.buffer?.duration && c.trigger();
    }, f.connect(te.masterNode), f.gain.value = n.volume ?? 1;
    let A = i((D) => {
      u.buffer = D.buf, a || (p = s.currentTime, u.start(0, b), w = true);
    }, "start"), M = fn(t);
    M instanceof pe && M.onLoad(A);
    let N = i(() => {
      if (!u.buffer)
        return 0;
      let D = a ? l - p : s.currentTime - p, P = u.buffer.duration;
      return u.loop ? D % P : Math.min(D, P);
    }, "getTime"), V = i((D) => {
      let P = s.createBufferSource();
      return P.buffer = D.buffer, P.loop = D.loop, P.playbackRate.value = D.playbackRate.value, P.detune.value = D.detune.value, P.onended = D.onended, P.connect(f), P;
    }, "cloneNode");
    return { stop() {
      this.paused = true, this.seek(0);
    }, set paused(D) {
      if (a !== D)
        if (a = D, D)
          w && (u.stop(), w = false), l = s.currentTime;
        else {
          u = V(u);
          let P = l - p;
          u.start(0, P), w = true, p = s.currentTime - P, l = 0;
        }
    }, get paused() {
      return a;
    }, play(D = 0) {
      this.seek(D), this.paused = false;
    }, seek(D) {
      u.buffer?.duration && (D > u.buffer.duration || (a ? (u = V(u), p = l - D) : (u.stop(), u = V(u), p = s.currentTime - D, u.start(0, D), w = true, l = 0)));
    }, set speed(D) {
      u.playbackRate.value = D;
    }, get speed() {
      return u.playbackRate.value;
    }, set detune(D) {
      u.detune.value = D;
    }, get detune() {
      return u.detune.value;
    }, set volume(D) {
      f.gain.value = Math.max(D, 0);
    }, get volume() {
      return f.gain.value;
    }, set loop(D) {
      u.loop = D;
    }, get loop() {
      return u.loop;
    }, duration() {
      return u.buffer?.duration ?? 0;
    }, time() {
      return N() % this.duration();
    }, onEnd(D) {
      return c.add(D);
    }, then(D) {
      return this.onEnd(D);
    } };
  }
  i(Mt, "play");
  function Dt(t) {
    return Mt(te.burpSnd, t);
  }
  i(Dt, "burp");
  function ut(t = zn, n = Kn) {
    let s = Gi.replace("{{user}}", t ?? zn), a = Bi.replace("{{user}}", n ?? Kn);
    try {
      return new Kt(q, s, a, Xn.map((u) => u.name));
    } catch (u) {
      let f = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/, b = Or(u).match(f), p = Number(b.groups.line) - 14, l = b.groups.msg.trim(), w = b.groups.type.toLowerCase();
      throw new Error(`${w} shader line ${p}: ${l}`);
    }
  }
  i(ut, "makeShader");
  function gn(t, n, s, a) {
    let u = t.width / n, c = {}, f = a.split("").entries();
    for (let [b, p] of f)
      c[p] = new re(b % u * n, Math.floor(b / u) * s, n, s);
    return { tex: t, map: c, size: s };
  }
  i(gn, "makeFont");
  function ct(t, n, s, a = E.defTex, u = E.defShader, c = {}) {
    let f = mn(u);
    if (!f || f instanceof pe)
      return;
    let b = E.fixed || s ? E.transform : C.cam.transform.mult(E.transform), p = [];
    for (let l of t) {
      let w = bn(b.multVec2(l.pos));
      p.push(w.x, w.y, l.uv.x, l.uv.y, l.color.r / 255, l.color.g / 255, l.color.b / 255, l.opacity);
    }
    E.renderer.push(S.TRIANGLES, p, n, f, a, c);
  }
  i(ct, "drawRaw");
  function Ue() {
    E.renderer.flush();
  }
  i(Ue, "flush");
  function Ft() {
    S.clear(S.COLOR_BUFFER_BIT), E.frameBuffer.bind(), S.viewport(0, 0, E.frameBuffer.width, E.frameBuffer.height), S.clear(S.COLOR_BUFFER_BIT), E.bgColor || Ne(() => {
      ke({ width: fe(), height: ge(), quad: new re(0, 0, fe() / jr, ge() / jr), tex: E.bgTex, fixed: true });
    }), E.renderer.numDraws = 0, E.fixed = false, E.transformStack.length = 0, E.transform = new we;
  }
  i(Ft, "frameStart");
  function wn(t, n) {
    E.postShader = t, E.postShaderUniform = n ?? null;
  }
  i(wn, "usePostEffect");
  function ht() {
    Ue(), E.lastDrawCalls = E.renderer.numDraws, E.frameBuffer.unbind(), S.viewport(0, 0, S.drawingBufferWidth, S.drawingBufferHeight);
    let { width: t, height: n } = E;
    E.width = S.drawingBufferWidth / O, E.height = S.drawingBufferHeight / O, He({ flipY: true, tex: E.frameBuffer.tex, pos: new y(E.viewport.x, E.viewport.y), width: E.viewport.width, height: E.viewport.height, shader: E.postShader, uniform: typeof E.postShaderUniform == "function" ? E.postShaderUniform() : E.postShaderUniform, fixed: true }), Ue(), E.width = t, E.height = n;
  }
  i(ht, "frameEnd");
  function bn(t) {
    return new y(t.x / fe() * 2 - 1, -t.y / ge() * 2 + 1);
  }
  i(bn, "screen2ndc");
  function vn(t) {
    E.transform = t.clone();
  }
  i(vn, "pushMatrix");
  function H(...t) {
    if (t[0] === undefined)
      return;
    let n = T(...t);
    n.x === 0 && n.y === 0 || E.transform.translate(n);
  }
  i(H, "pushTranslate");
  function xe(...t) {
    if (t[0] === undefined)
      return;
    let n = T(...t);
    n.x === 1 && n.y === 1 || E.transform.scale(n);
  }
  i(xe, "pushScale");
  function ve(t) {
    t && E.transform.rotate(t);
  }
  i(ve, "pushRotate");
  function de() {
    E.transformStack.push(E.transform.clone());
  }
  i(de, "pushTransform");
  function le() {
    E.transformStack.length > 0 && (E.transform = E.transformStack.pop());
  }
  i(le, "popTransform");
  function ke(t) {
    if (t.width === undefined || t.height === undefined)
      throw new Error('drawUVQuad() requires property "width" and "height".');
    if (t.width <= 0 || t.height <= 0)
      return;
    let { width: n, height: s } = t, u = ot(t.anchor || Qt).scale(new y(n, s).scale(-0.5)), c = t.quad || new re(0, 0, 1, 1), f = t.color || Z(255, 255, 255), b = t.opacity ?? 1, p = t.tex ? Kr / t.tex.width : 0, l = t.tex ? Kr / t.tex.height : 0, w = c.x + p, A = c.y + l, M = c.w - p * 2, N = c.h - l * 2;
    de(), H(t.pos), ve(t.angle), xe(t.scale), H(u), ct([{ pos: new y(-n / 2, s / 2), uv: new y(t.flipX ? w + M : w, t.flipY ? A : A + N), color: f, opacity: b }, { pos: new y(-n / 2, -s / 2), uv: new y(t.flipX ? w + M : w, t.flipY ? A + N : A), color: f, opacity: b }, { pos: new y(n / 2, -s / 2), uv: new y(t.flipX ? w : w + M, t.flipY ? A + N : A), color: f, opacity: b }, { pos: new y(n / 2, s / 2), uv: new y(t.flipX ? w : w + M, t.flipY ? A : A + N), color: f, opacity: b }], [0, 1, 3, 1, 2, 3], t.fixed, t.tex, t.shader, t.uniform), le();
  }
  i(ke, "drawUVQuad");
  function He(t) {
    if (!t.tex)
      throw new Error('drawTexture() requires property "tex".');
    let n = t.quad ?? new re(0, 0, 1, 1), s = t.tex.width * n.w, a = t.tex.height * n.h, u = new y(1);
    if (t.tiled) {
      let c = Math.ceil((t.width || s) / s), f = Math.ceil((t.height || a) / a), p = ot(t.anchor || Qt).add(new y(1, 1)).scale(0.5).scale(c * s, f * a);
      for (let l = 0;l < c; l++)
        for (let w = 0;w < f; w++)
          ke(Object.assign({}, t, { pos: (t.pos || new y(0)).add(new y(s * l, a * w)).sub(p), scale: u.scale(t.scale || new y(1)), tex: t.tex, quad: n, width: s, height: a, anchor: "topleft" }));
    } else
      t.width && t.height ? (u.x = t.width / s, u.y = t.height / a) : t.width ? (u.x = t.width / s, u.y = u.x) : t.height && (u.y = t.height / a, u.x = u.y), ke(Object.assign({}, t, { scale: u.scale(t.scale || new y(1)), tex: t.tex, quad: n, width: s, height: a }));
  }
  i(He, "drawTexture");
  function Gt(t) {
    if (!t.sprite)
      throw new Error('drawSprite() requires property "sprite"');
    let n = at(t.sprite);
    if (!n || !n.data)
      return;
    let s = n.data.frames[t.frame ?? 0];
    if (!s)
      throw new Error(`Frame not found: ${t.frame ?? 0}`);
    He(Object.assign({}, t, { tex: n.data.tex, quad: s.scale(t.quad ?? new re(0, 0, 1, 1)) }));
  }
  i(Gt, "drawSprite");
  function h(t, n, s, a, u, c = 1) {
    a = Re(a % 360), u = Re(u % 360), u <= a && (u += Math.PI * 2);
    let f = [], b = Math.ceil((u - a) / Re(8) * c), p = (u - a) / b;
    for (let l = a;l < u; l += p)
      f.push(t.add(n * Math.cos(l), s * Math.sin(l)));
    return f.push(t.add(n * Math.cos(u), s * Math.sin(u))), f;
  }
  i(h, "getArcPts");
  function v(t) {
    if (t.width === undefined || t.height === undefined)
      throw new Error('drawRect() requires property "width" and "height".');
    if (t.width <= 0 || t.height <= 0)
      return;
    let { width: n, height: s } = t, u = ot(t.anchor || Qt).add(1, 1).scale(new y(n, s).scale(-0.5)), c = [new y(0, 0), new y(n, 0), new y(n, s), new y(0, s)];
    if (t.radius) {
      let f = Math.min(Math.min(n, s) / 2, t.radius);
      c = [new y(f, 0), new y(n - f, 0), ...h(new y(n - f, f), f, f, 270, 360), new y(n, f), new y(n, s - f), ...h(new y(n - f, s - f), f, f, 0, 90), new y(n - f, s), new y(f, s), ...h(new y(f, s - f), f, f, 90, 180), new y(0, s - f), new y(0, f), ...h(new y(f, f), f, f, 180, 270)];
    }
    ye(Object.assign({}, t, { offset: u, pts: c, ...t.gradient ? { colors: t.horizontal ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]] : [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]] } : {} }));
  }
  i(v, "drawRect");
  function R(t) {
    let { p1: n, p2: s } = t;
    if (!n || !s)
      throw new Error('drawLine() requires properties "p1" and "p2".');
    let a = t.width || 1, u = s.sub(n).unit().normal().scale(a * 0.5), c = [n.sub(u), n.add(u), s.add(u), s.sub(u)].map((f) => ({ pos: new y(f.x, f.y), uv: new y(0), color: t.color ?? X.WHITE, opacity: t.opacity ?? 1 }));
    ct(c, [0, 1, 3, 1, 2, 3], t.fixed, E.defTex, t.shader, t.uniform);
  }
  i(R, "drawLine");
  function k(t) {
    let n = t.pts;
    if (!n)
      throw new Error('drawLines() requires property "pts".');
    if (!(n.length < 2))
      if (t.radius && n.length >= 3) {
        let s = n[0].sdist(n[1]);
        for (let u = 1;u < n.length - 1; u++)
          s = Math.min(n[u].sdist(n[u + 1]), s);
        let a = Math.min(t.radius, Math.sqrt(s) / 2);
        R(Object.assign({}, t, { p1: n[0], p2: n[1] }));
        for (let u = 1;u < n.length - 2; u++) {
          let c = n[u], f = n[u + 1];
          R(Object.assign({}, t, { p1: c, p2: f }));
        }
        R(Object.assign({}, t, { p1: n[n.length - 2], p2: n[n.length - 1] }));
      } else
        for (let s = 0;s < n.length - 1; s++)
          R(Object.assign({}, t, { p1: n[s], p2: n[s + 1] })), t.join !== "none" && W(Object.assign({}, t, { pos: n[s], radius: t.width / 2 }));
  }
  i(k, "drawLines");
  function ae(t) {
    if (!t.p1 || !t.p2 || !t.p3)
      throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
    return ye(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
  }
  i(ae, "drawTriangle");
  function W(t) {
    if (typeof t.radius != "number")
      throw new Error('drawCircle() requires property "radius".');
    t.radius !== 0 && Ee(Object.assign({}, t, { radiusX: t.radius, radiusY: t.radius, angle: 0 }));
  }
  i(W, "drawCircle");
  function Ee(t) {
    if (t.radiusX === undefined || t.radiusY === undefined)
      throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
    if (t.radiusX === 0 || t.radiusY === 0)
      return;
    let n = t.start ?? 0, s = t.end ?? 360, a = ot(t.anchor ?? "center").scale(new y(-t.radiusX, -t.radiusY)), u = h(a, t.radiusX, t.radiusY, n, s, t.resolution);
    u.unshift(a);
    let c = Object.assign({}, t, { pts: u, radius: 0, ...t.gradient ? { colors: [t.gradient[0], ...Array(u.length - 1).fill(t.gradient[1])] } : {} });
    if (s - n >= 360 && t.outline) {
      t.fill !== false && ye(Object.assign(c, { outline: null })), ye(Object.assign(c, { pts: u.slice(1), fill: false }));
      return;
    }
    ye(c);
  }
  i(Ee, "drawEllipse");
  function ye(t) {
    if (!t.pts)
      throw new Error('drawPolygon() requires property "pts".');
    let n = t.pts.length;
    if (!(n < 3)) {
      if (de(), H(t.pos), xe(t.scale), ve(t.angle), H(t.offset), t.fill !== false) {
        let s = t.color ?? X.WHITE, a = t.pts.map((c, f) => ({ pos: new y(c.x, c.y), uv: new y(0, 0), color: t.colors ? t.colors[f] ?? s : s, opacity: t.opacity ?? 1 })), u = [...Array(n - 2).keys()].map((c) => [0, c + 1, c + 2]).flat();
        ct(a, t.indices ?? u, t.fixed, E.defTex, t.shader, t.uniform);
      }
      t.outline && k({ pts: [...t.pts, t.pts[0]], radius: t.radius, width: t.outline.width, color: t.outline.color, join: t.outline.join, uniform: t.uniform, fixed: t.fixed, opacity: t.opacity }), le();
    }
  }
  i(ye, "drawPolygon");
  function Bt(t, n, s) {
    Ue(), S.clear(S.STENCIL_BUFFER_BIT), S.enable(S.STENCIL_TEST), S.stencilFunc(S.NEVER, 1, 255), S.stencilOp(S.REPLACE, S.REPLACE, S.REPLACE), n(), Ue(), S.stencilFunc(s, 1, 255), S.stencilOp(S.KEEP, S.KEEP, S.KEEP), t(), Ue(), S.disable(S.STENCIL_TEST);
  }
  i(Bt, "drawStenciled");
  function Te(t, n) {
    Bt(t, n, S.EQUAL);
  }
  i(Te, "drawMasked");
  function Qe(t, n) {
    Bt(t, n, S.NOTEQUAL);
  }
  i(Qe, "drawSubtracted");
  function Wn() {
    return (E.viewport.width + E.viewport.height) / (E.width + E.height);
  }
  i(Wn, "getViewportScale");
  function Ne(t) {
    Ue();
    let { width: n, height: s } = E;
    E.width = E.viewport.width, E.height = E.viewport.height, t(), Ue(), E.width = n, E.height = s;
  }
  i(Ne, "drawUnscaled");
  function Jn(t, n) {
    n.pos && (t.pos = t.pos.add(n.pos)), n.scale && (t.scale = t.scale.scale(T(n.scale))), n.angle && (t.angle += n.angle), n.color && (t.color = t.color.mult(n.color)), n.opacity && (t.opacity *= n.opacity);
  }
  i(Jn, "applyCharTransform");
  let Qn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
  function Wr(t) {
    let n = {}, s = t.replace(Qn, "$2"), a = 0;
    for (let u of t.matchAll(Qn)) {
      let c = u.index - a;
      for (let f = 0;f < u.groups.text.length; f++)
        n[f + c] = [u.groups.style];
      a += u[0].length - u.groups.text.length;
    }
    return { charStyleMap: n, text: s };
  }
  i(Wr, "compileStyledText");
  let yn = {};
  function qe(t) {
    if (t.text === undefined)
      throw new Error('formatText() requires property "text".');
    let n = Ot(t.font);
    if (t.text === "" || n instanceof pe || !n)
      return { width: 0, height: 0, chars: [], opt: t };
    let { charStyleMap: s, text: a } = Wr(t.text + ""), u = a.split("");
    if (n instanceof Je || typeof n == "string") {
      let J = n instanceof Je ? n.fontface.family : n, $ = n instanceof Je ? { outline: n.outline, filter: n.filter } : { outline: null, filter: Yn }, I = yn[J] ?? { font: { tex: new Se(q, qr, $r, { filter: $.filter }), map: {}, size: _r }, cursor: new y(0), outline: $.outline };
      yn[J] || (yn[J] = I), n = I.font;
      for (let ce of u)
        if (!I.font.map[ce]) {
          let U = j;
          U.clearRect(0, 0, L.width, L.height), U.font = `${n.size}px ${J}`, U.textBaseline = "top", U.textAlign = "left", U.fillStyle = "#ffffff";
          let F = U.measureText(ce), G = Math.ceil(F.width), B = n.size;
          I.outline && (U.lineJoin = "round", U.lineWidth = I.outline.width * 2, U.strokeStyle = I.outline.color.toHex(), U.strokeText(ce, I.outline.width, I.outline.width), G += I.outline.width * 2, B += I.outline.width * 3), U.fillText(ce, I.outline?.width ?? 0, I.outline?.width ?? 0);
          let K = U.getImageData(0, 0, G, B);
          if (I.cursor.x + G > qr && (I.cursor.x = 0, I.cursor.y += B, I.cursor.y > $r))
            throw new Error("Font atlas exceeds character limit");
          n.tex.update(K, I.cursor.x, I.cursor.y), n.map[ce] = new re(I.cursor.x, I.cursor.y, G, B), I.cursor.x += G;
        }
    }
    let c = t.size || n.size, f = T(t.scale ?? 1).scale(c / n.size), b = t.lineSpacing ?? 0, p = t.letterSpacing ?? 0, l = 0, w = 0, A = 0, M = [], N = [], V = 0, D = null, P = null;
    for (;V < u.length; ) {
      let J = u[V];
      if (J === `
`)
        A += c + b, M.push({ width: l - p, chars: N }), D = null, P = null, l = 0, N = [];
      else {
        let $ = n.map[J];
        if ($) {
          let I = $.w * f.x;
          t.width && l + I > t.width && (A += c + b, D != null && (V -= N.length - D, J = u[V], $ = n.map[J], I = $.w * f.x, N = N.slice(0, D - 1), l = P), D = null, P = null, M.push({ width: l - p, chars: N }), l = 0, N = []), N.push({ tex: n.tex, width: $.w, height: $.h, quad: new re($.x / n.tex.width, $.y / n.tex.height, $.w / n.tex.width, $.h / n.tex.height), ch: J, pos: new y(l, A), opacity: t.opacity ?? 1, color: t.color ?? X.WHITE, scale: T(f), angle: 0 }), J === " " && (D = N.length, P = l), l += I, w = Math.max(w, l), l += p;
        }
      }
      V++;
    }
    M.push({ width: l - p, chars: N }), A += c, t.width && (w = t.width);
    let se = [];
    for (let J of M) {
      let $ = (w - J.width) * Vi(t.align ?? "left");
      for (let I of J.chars) {
        let ce = n.map[I.ch], U = se.length;
        if (I.pos = I.pos.add($, 0).add(ce.w * f.x * 0.5, ce.h * f.y * 0.5), t.transform) {
          let F = typeof t.transform == "function" ? t.transform(U, I.ch) : t.transform;
          F && Jn(I, F);
        }
        if (s[U]) {
          let F = s[U];
          for (let G of F) {
            let B = t.styles[G], K = typeof B == "function" ? B(U, I.ch) : B;
            K && Jn(I, K);
          }
        }
        se.push(I);
      }
    }
    return { width: w, height: A, chars: se, opt: t };
  }
  i(qe, "formatText");
  function Zn(t) {
    $e(qe(t));
  }
  i(Zn, "drawText");
  function $e(t) {
    de(), H(t.opt.pos), ve(t.opt.angle), H(ot(t.opt.anchor ?? "topleft").add(1, 1).scale(t.width, t.height).scale(-0.5)), t.chars.forEach((n) => {
      ke({ tex: n.tex, width: n.width, height: n.height, pos: n.pos, scale: n.scale, angle: n.angle, color: n.color, opacity: n.opacity, quad: n.quad, anchor: "center", uniform: t.opt.uniform, shader: t.opt.shader, fixed: t.opt.fixed });
    }), le();
  }
  i($e, "drawFormattedText");
  function fe() {
    return E.width;
  }
  i(fe, "width");
  function ge() {
    return E.height;
  }
  i(ge, "height");
  let Ze = {};
  function Jr(t) {
    return new y((t.x - E.viewport.x) * fe() / E.viewport.width, (t.y - E.viewport.y) * ge() / E.viewport.height);
  }
  i(Jr, "windowToContent");
  function Qr(t) {
    return new y(t.x * E.viewport.width / E.width, t.y * E.viewport.height / E.height);
  }
  i(Qr, "contentToView");
  function Lt() {
    return Jr(x.mousePos());
  }
  i(Lt, "mousePos"), Ze.error = (t) => {
    t.error && t.error instanceof Error ? On(t.error) : t instanceof Error && On(t);
  }, Ze.unhandledrejection = (t) => {
    t.reason instanceof Error && On(t.reason);
  };
  for (let t in Ze)
    window.addEventListener(t, Ze[t]);
  let er = false, ne = { inspect: false, timeScale: 1, showLog: true, fps: () => x.fps(), numFrames: () => x.numFrames(), stepFrame: hr, drawCalls: () => E.lastDrawCalls, clearLog: () => C.logs = [], log: (t) => {
    let n = r13.logMax ?? Pi;
    C.logs.unshift({ msg: t, time: x.time() }), C.logs.length > n && (C.logs = C.logs.slice(0, n));
  }, error: (t) => ne.log(new Error(t.toString ? t.toString() : t)), curRecording: null, numObjects: () => An("*", { recursive: true }).length, get paused() {
    return er;
  }, set paused(t) {
    er = t, t ? te.ctx.suspend() : te.ctx.resume();
  } };
  function Ae() {
    return x.dt() * ne.timeScale;
  }
  i(Ae, "dt");
  function Zr(...t) {
    return t.length > 0 && (C.cam.pos = T(...t)), C.cam.pos ? C.cam.pos.clone() : jt();
  }
  i(Zr, "camPos");
  function es(...t) {
    return t.length > 0 && (C.cam.scale = T(...t)), C.cam.scale.clone();
  }
  i(es, "camScale");
  function ts(t) {
    return t !== undefined && (C.cam.angle = t), C.cam.angle;
  }
  i(ts, "camRot");
  function ns(t = 12) {
    C.cam.shake += t;
  }
  i(ns, "shake");
  function tr(t) {
    return C.cam.transform.multVec2(t);
  }
  i(tr, "toScreen");
  function nr(t) {
    return C.cam.transform.invert().multVec2(t);
  }
  i(nr, "toWorld");
  function It(t) {
    let n = new we;
    return t.pos && n.translate(t.pos), t.scale && n.scale(t.scale), t.angle && n.rotate(t.angle), t.parent ? n.mult(t.parent.transform) : n;
  }
  i(It, "calcTransform");
  function xn(t = []) {
    let n = new Map, s = {}, a = new Le, u = [], c = null, f = false, b = { id: Pr(), hidden: false, transform: new we, children: [], parent: null, set paused(l) {
      if (l !== f) {
        f = l;
        for (let w of u)
          w.paused = l;
      }
    }, get paused() {
      return f;
    }, add(l = []) {
      let w = Array.isArray(l) ? xn(l) : l;
      if (w.parent)
        throw new Error("Cannot add a game obj that already has a parent.");
      return w.parent = this, w.transform = It(w), this.children.push(w), w.trigger("add", w), C.events.trigger("add", w), w;
    }, readd(l) {
      let w = this.children.indexOf(l);
      return w !== -1 && (this.children.splice(w, 1), this.children.push(l)), l;
    }, remove(l) {
      let w = this.children.indexOf(l);
      if (w !== -1) {
        l.parent = null, this.children.splice(w, 1);
        let A = i((M) => {
          M.trigger("destroy"), C.events.trigger("destroy", M), M.children.forEach((N) => A(N));
        }, "trigger");
        A(l);
      }
    }, removeAll(l) {
      if (l)
        this.get(l).forEach((w) => this.remove(w));
      else
        for (let w of [...this.children])
          this.remove(w);
    }, update() {
      this.paused || (this.children.sort((l, w) => (l.z ?? 0) - (w.z ?? 0)).forEach((l) => l.update()), this.trigger("update"));
    }, draw() {
      if (this.hidden)
        return;
      let l = E.fixed;
      this.fixed && (E.fixed = true), de(), H(this.pos), xe(this.scale), ve(this.angle);
      let w = this.children.sort((A, M) => (A.z ?? 0) - (M.z ?? 0));
      if (this.mask) {
        let A = { intersect: Te, subtract: Qe }[this.mask];
        if (!A)
          throw new Error(`Invalid mask func: "${this.mask}"`);
        A(() => {
          w.forEach((M) => M.draw());
        }, () => {
          this.trigger("draw");
        });
      } else
        this.trigger("draw"), w.forEach((A) => A.draw());
      le(), E.fixed = l;
    }, drawInspect() {
      this.hidden || (de(), H(this.pos), xe(this.scale), ve(this.angle), this.children.sort((l, w) => (l.z ?? 0) - (w.z ?? 0)).forEach((l) => l.drawInspect()), this.trigger("drawInspect"), le());
    }, use(l) {
      if (!l)
        return;
      if (typeof l == "string")
        return this.use({ id: l });
      let w = [];
      l.id && (this.unuse(l.id), s[l.id] = [], w = s[l.id], n.set(l.id, l));
      for (let M in l) {
        if (Li.has(M))
          continue;
        let N = Object.getOwnPropertyDescriptor(l, M);
        if (typeof N.value == "function" && (l[M] = l[M].bind(this)), N.set && Object.defineProperty(l, M, { set: N.set.bind(this) }), N.get && Object.defineProperty(l, M, { get: N.get.bind(this) }), Ii.has(M)) {
          let V = M === "add" ? () => {
            c = i((D) => w.push(D), "onCurCompCleanup"), l[M](), c = null;
          } : l[M];
          w.push(this.on(M, V).cancel);
        } else if (this[M] === undefined)
          Object.defineProperty(this, M, { get: () => l[M], set: (V) => l[M] = V, configurable: true, enumerable: true }), w.push(() => delete this[M]);
        else
          throw new Error(`Duplicate component property: "${M}"`);
      }
      let A = i(() => {
        if (l.require) {
          for (let M of l.require)
            if (!this.c(M))
              throw new Error(`Component "${l.id}" requires component "${M}"`);
        }
      }, "checkDeps");
      l.destroy && w.push(l.destroy.bind(this)), this.exists() ? (A(), l.add && (c = i((M) => w.push(M), "onCurCompCleanup"), l.add.call(this), c = null)) : l.require && w.push(this.on("add", A).cancel);
    }, unuse(l) {
      s[l] && (s[l].forEach((w) => w()), delete s[l]), n.has(l) && n.delete(l);
    }, c(l) {
      return n.get(l);
    }, get(l, w = {}) {
      let A = w.recursive ? this.children.flatMap(i(function M(N) {
        return [N, ...N.children.flatMap(M)];
      }, "recurse")) : this.children;
      if (A = A.filter((M) => l ? M.is(l) : true), w.liveUpdate) {
        let M = i((V) => w.recursive ? this.isAncestorOf(V) : V.parent === this, "isChild"), N = [];
        N.push(Un((V) => {
          M(V) && V.is(l) && A.push(V);
        })), N.push(rr((V) => {
          if (M(V) && V.is(l)) {
            let D = A.findIndex((P) => P.id === V.id);
            D !== -1 && A.splice(D, 1);
          }
        })), this.onDestroy(() => {
          for (let V of N)
            V.cancel();
        });
      }
      return A;
    }, isAncestorOf(l) {
      return l.parent ? l.parent === this || this.isAncestorOf(l.parent) : false;
    }, exists() {
      return C.root.isAncestorOf(this);
    }, is(l) {
      if (l === "*")
        return true;
      if (Array.isArray(l)) {
        for (let w of l)
          if (!this.c(w))
            return false;
        return true;
      } else
        return this.c(l) != null;
    }, on(l, w) {
      let A = a.on(l, w.bind(this));
      return c && c(() => A.cancel()), A;
    }, trigger(l, ...w) {
      a.trigger(l, ...w), C.objEvents.trigger(l, this, ...w);
    }, destroy() {
      this.parent && this.parent.remove(this);
    }, inspect() {
      let l = {};
      for (let [w, A] of n)
        l[w] = A.inspect ? A.inspect() : null;
      return l;
    }, onAdd(l) {
      return this.on("add", l);
    }, onUpdate(l) {
      return this.on("update", l);
    }, onDraw(l) {
      return this.on("draw", l);
    }, onDestroy(l) {
      return this.on("destroy", l);
    }, clearEvents() {
      a.clear();
    } }, p = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick"];
    for (let l of p)
      b[l] = (...w) => {
        let A = x[l](...w);
        return u.push(A), b.onDestroy(() => A.cancel()), A;
      };
    for (let l of t)
      b.use(l);
    return b;
  }
  i(xn, "make");
  function je(t, n, s) {
    return C.objEvents[t] || (C.objEvents[t] = new vt), C.objEvents.on(t, (a, ...u) => {
      a.is(n) && s(a, ...u);
    });
  }
  i(je, "on");
  let rs = i((t, n) => {
    if (typeof t == "function" && n === undefined) {
      let s = ft([{ update: t }]);
      return { get paused() {
        return s.paused;
      }, set paused(a) {
        s.paused = a;
      }, cancel: () => s.destroy() };
    } else if (typeof t == "string")
      return je("update", t, n);
  }, "onUpdate"), ss = i((t, n) => {
    if (typeof t == "function" && n === undefined) {
      let s = ft([{ draw: t }]);
      return { get paused() {
        return s.hidden;
      }, set paused(a) {
        s.hidden = a;
      }, cancel: () => s.destroy() };
    } else if (typeof t == "string")
      return je("draw", t, n);
  }, "onDraw");
  function Un(t, n) {
    if (typeof t == "function" && n === undefined)
      return C.events.on("add", t);
    if (typeof t == "string")
      return je("add", t, n);
  }
  i(Un, "onAdd");
  function rr(t, n) {
    if (typeof t == "function" && n === undefined)
      return C.events.on("destroy", t);
    if (typeof t == "string")
      return je("destroy", t, n);
  }
  i(rr, "onDestroy");
  function is(t, n, s) {
    return je("collide", t, (a, u, c) => u.is(n) && s(a, u, c));
  }
  i(is, "onCollide");
  function os(t, n, s) {
    return je("collideUpdate", t, (a, u, c) => u.is(n) && s(a, u, c));
  }
  i(os, "onCollideUpdate");
  function as(t, n, s) {
    return je("collideEnd", t, (a, u, c) => u.is(n) && s(a, u, c));
  }
  i(as, "onCollideEnd");
  function Vt(t, n) {
    An(t, { recursive: true }).forEach(n), Un(t, n);
  }
  i(Vt, "forAllCurrentAndFuture");
  function us(t, n) {
    if (typeof t == "function")
      return x.onMousePress(t);
    {
      let s = [];
      return Vt(t, (a) => {
        if (!a.area)
          throw new Error("onClick() requires the object to have area() component");
        s.push(a.onClick(() => n(a)));
      }), Be.join(s);
    }
  }
  i(us, "onClick");
  function cs(t, n) {
    let s = [];
    return Vt(t, (a) => {
      if (!a.area)
        throw new Error("onHover() requires the object to have area() component");
      s.push(a.onHover(() => n(a)));
    }), Be.join(s);
  }
  i(cs, "onHover");
  function hs(t, n) {
    let s = [];
    return Vt(t, (a) => {
      if (!a.area)
        throw new Error("onHoverUpdate() requires the object to have area() component");
      s.push(a.onHoverUpdate(() => n(a)));
    }), Be.join(s);
  }
  i(hs, "onHoverUpdate");
  function ls(t, n) {
    let s = [];
    return Vt(t, (a) => {
      if (!a.area)
        throw new Error("onHoverEnd() requires the object to have area() component");
      s.push(a.onHoverEnd(() => n(a)));
    }), Be.join(s);
  }
  i(ls, "onHoverEnd");
  function ds() {
    x.onKeyPress("f1", () => {
      ne.inspect = !ne.inspect;
    }), x.onKeyPress("f2", () => {
      ne.clearLog();
    }), x.onKeyPress("f8", () => {
      ne.paused = !ne.paused;
    }), x.onKeyPress("f7", () => {
      ne.timeScale = lt(De(ne.timeScale - 0.2, 0, 2), 1);
    }), x.onKeyPress("f9", () => {
      ne.timeScale = lt(De(ne.timeScale + 0.2, 0, 2), 1);
    }), x.onKeyPress("f10", () => {
      ne.stepFrame();
    });
  }
  i(ds, "enterDebugMode");
  function fs() {
    x.onKeyPress("b", () => Dt());
  }
  i(fs, "enterBurpMode");
  function ms(t) {
    C.gravity = t;
  }
  i(ms, "setGravity");
  function ps() {
    return C.gravity;
  }
  i(ps, "getGravity");
  function gs(...t) {
    t.length === 1 || t.length === 2 ? (E.bgColor = Z(t[0]), t[1] && (E.bgAlpha = t[1])) : (t.length === 3 || t.length === 4) && (E.bgColor = Z(t[0], t[1], t[2]), t[3] && (E.bgAlpha = t[3])), S.clearColor(E.bgColor.r / 255, E.bgColor.g / 255, E.bgColor.b / 255, E.bgAlpha);
  }
  i(gs, "setBackground");
  function ws() {
    return E.bgColor.clone();
  }
  i(ws, "getBackground");
  function kt(...t) {
    return { id: "pos", pos: T(...t), moveBy(...n) {
      this.pos = this.pos.add(T(...n));
    }, move(...n) {
      this.moveBy(T(...n).scale(Ae()));
    }, moveTo(...n) {
      if (typeof n[0] == "number" && typeof n[1] == "number")
        return this.moveTo(T(n[0], n[1]), n[2]);
      let s = n[0], a = n[1];
      if (a === undefined) {
        this.pos = T(s);
        return;
      }
      let u = s.sub(this.pos);
      if (u.len() <= a * Ae()) {
        this.pos = T(s);
        return;
      }
      this.move(u.unit().scale(a));
    }, worldPos() {
      return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
    }, screenPos() {
      let n = this.worldPos();
      return dt2(this) ? n : tr(n);
    }, inspect() {
      return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
    }, drawInspect() {
      W({ color: Z(255, 0, 0), radius: 4 / Wn() });
    } };
  }
  i(kt, "pos");
  function Nt(...t) {
    return t.length === 0 ? Nt(1) : { id: "scale", scale: T(...t), scaleTo(...n) {
      this.scale = T(...n);
    }, scaleBy(...n) {
      this.scale.scale(T(...n));
    }, inspect() {
      return `(${lt(this.scale.x, 2)}, ${lt(this.scale.y, 2)})`;
    } };
  }
  i(Nt, "scale");
  function bs(t) {
    return { id: "rotate", angle: t ?? 0, rotateBy(n) {
      this.angle += n;
    }, rotateTo(n) {
      this.angle = n;
    }, inspect() {
      return `${Math.round(this.angle)}`;
    } };
  }
  i(bs, "rotate");
  function vs(...t) {
    return { id: "color", color: Z(...t), inspect() {
      return this.color.toString();
    } };
  }
  i(vs, "color");
  function lt(t, n) {
    return Number(t.toFixed(n));
  }
  i(lt, "toFixed");
  function ys(t) {
    return { id: "opacity", opacity: t ?? 1, inspect() {
      return `${lt(this.opacity, 1)}`;
    }, fadeOut(n = 1, s = yt.linear) {
      return Rn(this.opacity, 0, n, (a) => this.opacity = a, s);
    } };
  }
  i(ys, "opacity");
  function En(t) {
    if (!t)
      throw new Error("Please define an anchor");
    return { id: "anchor", anchor: t, inspect() {
      return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
    } };
  }
  i(En, "anchor");
  function xs(t) {
    return { id: "z", z: t, inspect() {
      return `${this.z}`;
    } };
  }
  i(xs, "z");
  function Us(t, n) {
    return { id: "follow", require: ["pos"], follow: { obj: t, offset: n ?? T(0) }, add() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    }, update() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    } };
  }
  i(Us, "follow");
  function Es(t, n) {
    let s = typeof t == "number" ? y.fromAngle(t) : t.unit();
    return { id: "move", require: ["pos"], update() {
      this.move(s.scale(n));
    } };
  }
  i(Es, "move");
  let Ss = 200;
  function Cs(t = {}) {
    let n = t.distance ?? Ss, s = false;
    return { id: "offscreen", require: ["pos"], isOffScreen() {
      let a = this.screenPos(), u = new ue(T(0), fe(), ge());
      return !gt(u, a) && u.sdistToPoint(a) > n * n;
    }, onExitScreen(a) {
      return this.on("exitView", a);
    }, onEnterScreen(a) {
      return this.on("enterView", a);
    }, update() {
      this.isOffScreen() ? (s || (this.trigger("exitView"), s = true), t.hide && (this.hidden = true), t.pause && (this.paused = true), t.destroy && this.destroy()) : (s && (this.trigger("enterView"), s = false), t.hide && (this.hidden = false), t.pause && (this.paused = false));
    } };
  }
  i(Cs, "offscreen");
  function dt2(t) {
    return t.fixed ? true : t.parent ? dt2(t.parent) : false;
  }
  i(dt2, "isFixed");
  function Ts(t = {}) {
    let n = {}, s = new Set;
    return { id: "area", collisionIgnore: t.collisionIgnore ?? [], add() {
      this.area.cursor && this.onHover(() => x.setCursor(this.area.cursor)), this.onCollideUpdate((a, u) => {
        n[a.id] || this.trigger("collide", a, u), n[a.id] = u, s.add(a.id);
      });
    }, update() {
      for (let a in n)
        s.has(Number(a)) || (this.trigger("collideEnd", n[a].target), delete n[a]);
      s.clear();
    }, drawInspect() {
      let a = this.localArea();
      de(), xe(this.area.scale), H(this.area.offset);
      let u = { outline: { width: 4 / Wn(), color: Z(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: dt2(this) };
      a instanceof ue ? v({ ...u, pos: a.pos, width: a.width, height: a.height }) : a instanceof Ke ? ye({ ...u, pts: a.pts }) : a instanceof wt && W({ ...u, pos: a.center, radius: a.radius }), le();
    }, area: { shape: t.shape ?? null, scale: t.scale ? T(t.scale) : T(1), offset: t.offset ?? T(0), cursor: t.cursor ?? null }, isClicked() {
      return x.isMousePressed() && this.isHovering();
    }, isHovering() {
      let a = dt2(this) ? Lt() : nr(Lt());
      return this.hasPoint(a);
    }, checkCollision(a) {
      return n[a.id] ?? null;
    }, getCollisions() {
      return Object.values(n);
    }, isColliding(a) {
      return !!n[a.id];
    }, isOverlapping(a) {
      let u = n[a.id];
      return u && u.hasOverlap();
    }, onClick(a) {
      let u = x.onMousePress("left", () => {
        this.isHovering() && a();
      });
      return this.onDestroy(() => u.cancel()), u;
    }, onHover(a) {
      let u = false;
      return this.onUpdate(() => {
        u ? u = this.isHovering() : this.isHovering() && (u = true, a());
      });
    }, onHoverUpdate(a) {
      return this.onUpdate(() => {
        this.isHovering() && a();
      });
    }, onHoverEnd(a) {
      let u = false;
      return this.onUpdate(() => {
        u ? this.isHovering() || (u = false, a()) : u = this.isHovering();
      });
    }, onCollide(a, u) {
      if (typeof a == "function" && u === undefined)
        return this.on("collide", a);
      if (typeof a == "string")
        return this.onCollide((c, f) => {
          c.is(a) && u(c, f);
        });
    }, onCollideUpdate(a, u) {
      if (typeof a == "function" && u === undefined)
        return this.on("collideUpdate", a);
      if (typeof a == "string")
        return this.on("collideUpdate", (c, f) => c.is(a) && u(c, f));
    }, onCollideEnd(a, u) {
      if (typeof a == "function" && u === undefined)
        return this.on("collideEnd", a);
      if (typeof a == "string")
        return this.on("collideEnd", (c) => c.is(a) && u(c));
    }, hasPoint(a) {
      return kn(this.worldArea(), a);
    }, resolveCollision(a) {
      let u = this.checkCollision(a);
      u && !u.resolved && (this.pos = this.pos.add(u.displacement), u.resolved = true);
    }, localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    }, worldArea() {
      let a = this.localArea();
      if (!(a instanceof Ke || a instanceof ue))
        throw new Error("Only support polygon and rect shapes for now");
      let u = this.transform.clone().scale(T(this.area.scale ?? 1)).translate(this.area.offset);
      if (a instanceof ue) {
        let c = ot(this.anchor || Qt).add(1, 1).scale(-0.5).scale(a.width, a.height);
        u.translate(c);
      }
      return a.transform(u);
    }, screenArea() {
      let a = this.worldArea();
      return dt2(this) ? a : a.transform(C.cam.transform);
    } };
  }
  i(Ts, "area");
  function et(t) {
    return { color: t.color, opacity: t.opacity, anchor: t.anchor, outline: t.outline, shader: t.shader, uniform: t.uniform };
  }
  i(et, "getRenderProps");
  function Sn(t, n = {}) {
    let s = null, a = null, u = null, c = new me;
    if (!t)
      throw new Error("Please pass the resource name or data to sprite()");
    let f = i((b, p, l, w) => {
      let A = T(1, 1);
      return l && w ? (A.x = l / (b.width * p.w), A.y = w / (b.height * p.h)) : l ? (A.x = l / (b.width * p.w), A.y = A.x) : w && (A.y = w / (b.height * p.h), A.x = A.y), A;
    }, "calcTexScale");
    return { id: "sprite", width: 0, height: 0, frame: n.frame || 0, quad: n.quad || new re(0, 0, 1, 1), animSpeed: n.animSpeed ?? 1, flipX: n.flipX ?? false, flipY: n.flipY ?? false, draw() {
      if (!s)
        return;
      let b = s.frames[this.frame ?? 0];
      if (!b)
        throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (s.slice9) {
        let { left: p, right: l, top: w, bottom: A } = s.slice9, M = s.tex.width * b.w, N = s.tex.height * b.h, V = this.width - p - l, D = this.height - w - A, P = p / M, se = l / M, J = 1 - P - se, $ = w / N, I = A / N, ce = 1 - $ - I, U = [oe(0, 0, P, $), oe(P, 0, J, $), oe(P + J, 0, se, $), oe(0, $, P, ce), oe(P, $, J, ce), oe(P + J, $, se, ce), oe(0, $ + ce, P, I), oe(P, $ + ce, J, I), oe(P + J, $ + ce, se, I), oe(0, 0, p, w), oe(p, 0, V, w), oe(p + V, 0, l, w), oe(0, w, p, D), oe(p, w, V, D), oe(p + V, w, l, D), oe(0, w + D, p, A), oe(p, w + D, V, A), oe(p + V, w + D, l, A)];
        for (let F = 0;F < 9; F++) {
          let G = U[F], B = U[F + 9];
          He(Object.assign(et(this), { pos: B.pos(), tex: s.tex, quad: b.scale(G), flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: B.w, height: B.h }));
        }
      } else
        He(Object.assign(et(this), { tex: s.tex, quad: b.scale(this.quad ?? new re(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: n.tiled, width: this.width, height: this.height }));
    }, add() {
      let b = i((l) => {
        let w = l.frames[0].clone();
        n.quad && (w = w.scale(n.quad));
        let A = f(l.tex, w, n.width, n.height);
        this.width = l.tex.width * w.w * A.x, this.height = l.tex.height * w.h * A.y, n.anim && this.play(n.anim), s = l, c.trigger(s);
      }, "setSpriteData"), p = at(t);
      p ? p.onLoad(b) : Tn(() => b(at(t).data));
    }, update() {
      if (!a)
        return;
      let b = s.anims[a.name];
      if (typeof b == "number") {
        this.frame = b;
        return;
      }
      if (b.speed === 0)
        throw new Error("Sprite anim speed cannot be 0");
      a.timer += Ae() * this.animSpeed, a.timer >= 1 / a.speed && (a.timer = 0, this.frame += u, (this.frame < Math.min(b.from, b.to) || this.frame > Math.max(b.from, b.to)) && (a.loop ? a.pingpong ? (this.frame -= u, u *= -1, this.frame += u) : this.frame = b.from : (this.frame = b.to, a.onEnd(), this.stop())));
    }, play(b, p = {}) {
      if (!s) {
        c.add(() => this.play(b, p));
        return;
      }
      let l = s.anims[b];
      if (l === undefined)
        throw new Error(`Anim not found: ${b}`);
      a && this.stop(), a = typeof l == "number" ? { name: b, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
      } } : { name: b, timer: 0, loop: p.loop ?? l.loop ?? false, pingpong: p.pingpong ?? l.pingpong ?? false, speed: p.speed ?? l.speed ?? 10, onEnd: p.onEnd ?? (() => {
      }) }, u = typeof l == "number" ? null : l.from < l.to ? 1 : -1, this.frame = typeof l == "number" ? l : l.from, this.trigger("animStart", b);
    }, stop() {
      if (!a)
        return;
      let b = a.name;
      a = null, this.trigger("animEnd", b);
    }, numFrames() {
      return s?.frames.length ?? 0;
    }, curAnim() {
      return a?.name;
    }, onAnimEnd(b) {
      return this.on("animEnd", b);
    }, onAnimStart(b) {
      return this.on("animStart", b);
    }, renderArea() {
      return new ue(T(0), this.width, this.height);
    }, inspect() {
      if (typeof t == "string")
        return `"${t}"`;
    } };
  }
  i(Sn, "sprite");
  function As(t, n = {}) {
    function s(u) {
      let c = qe(Object.assign(et(u), { text: u.text + "", size: u.textSize, font: u.font, width: n.width && u.width, align: u.align, letterSpacing: u.letterSpacing, lineSpacing: u.lineSpacing, transform: u.textTransform, styles: u.textStyles }));
      return n.width || (u.width = c.width / (u.scale?.x || 1)), u.height = c.height / (u.scale?.y || 1), c;
    }
    i(s, "update");
    let a = { id: "text", set text(u) {
      t = u, s(this);
    }, get text() {
      return t;
    }, textSize: n.size ?? Ai, font: n.font, width: n.width ?? 0, height: 0, align: n.align, lineSpacing: n.lineSpacing, letterSpacing: n.letterSpacing, textTransform: n.transform, textStyles: n.styles, add() {
      Tn(() => s(this));
    }, draw() {
      $e(s(this));
    }, renderArea() {
      return new ue(T(0), this.width, this.height);
    } };
    return s(a), a;
  }
  i(As, "text");
  function Rs(t, n, s = {}) {
    return { id: "rect", width: t, height: n, radius: s.radius || 0, draw() {
      v(Object.assign(et(this), { width: this.width, height: this.height, radius: this.radius, fill: s.fill }));
    }, renderArea() {
      return new ue(T(0), this.width, this.height);
    }, inspect() {
      return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
    } };
  }
  i(Rs, "rect");
  function Ps(t, n) {
    return { id: "rect", width: t, height: n, draw() {
      ke(Object.assign(et(this), { width: this.width, height: this.height }));
    }, renderArea() {
      return new ue(T(0), this.width, this.height);
    }, inspect() {
      return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
    } };
  }
  i(Ps, "uvquad");
  function Os(t, n = {}) {
    return { id: "circle", radius: t, draw() {
      W(Object.assign(et(this), { radius: this.radius, fill: n.fill }));
    }, renderArea() {
      return new ue(new y(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
    }, inspect() {
      return `${Math.ceil(this.radius)}`;
    } };
  }
  i(Os, "circle");
  function Ms(t = 1, n = Z(0, 0, 0)) {
    return { id: "outline", outline: { width: t, color: n } };
  }
  i(Ms, "outline");
  function Cn() {
    return { id: "timer", wait(t, n) {
      let s = [];
      n && s.push(n);
      let a = 0, u = this.onUpdate(() => {
        a += Ae(), a >= t && (s.forEach((c) => c()), u.cancel());
      });
      return { get paused() {
        return u.paused;
      }, set paused(c) {
        u.paused = c;
      }, cancel: u.cancel, onEnd(c) {
        s.push(c);
      }, then(c) {
        return this.onEnd(c), this;
      } };
    }, loop(t, n) {
      let s = null, a = i(() => {
        s = this.wait(t, a), n();
      }, "newAction");
      return s = this.wait(0, a), { get paused() {
        return s.paused;
      }, set paused(u) {
        s.paused = u;
      }, cancel: () => s.cancel() };
    }, tween(t, n, s, a, u = yt.linear) {
      let c = 0, f = [], b = this.onUpdate(() => {
        c += Ae();
        let p = Math.min(c / s, 1);
        a(Fe(t, n, u(p))), p === 1 && (b.cancel(), a(n), f.forEach((l) => l()));
      });
      return { get paused() {
        return b.paused;
      }, set paused(p) {
        b.paused = p;
      }, onEnd(p) {
        f.push(p);
      }, then(p) {
        return this.onEnd(p), this;
      }, cancel() {
        b.cancel();
      }, finish() {
        b.cancel(), a(n), f.forEach((p) => p());
      } };
    } };
  }
  i(Cn, "timer");
  let Ds = 640, Fs = 65536;
  function Gs(t = {}) {
    let n = T(0), s = null, a = null, u = false;
    return { id: "body", require: ["pos", "area"], jumpForce: t.jumpForce ?? Ds, gravityScale: t.gravityScale ?? 1, isStatic: t.isStatic ?? false, mass: t.mass ?? 1, add() {
      if (this.mass === 0)
        throw new Error("Can't set body mass to 0");
      this.onCollideUpdate((c, f) => {
        if (c.is("body") && !f.resolved && (this.trigger("beforePhysicsResolve", f), c.trigger("beforePhysicsResolve", f.reverse()), !f.resolved && !(this.isStatic && c.isStatic))) {
          if (!this.isStatic && !c.isStatic) {
            let b = this.mass + c.mass;
            this.pos = this.pos.add(f.displacement.scale(c.mass / b)), c.pos = c.pos.add(f.displacement.scale(-this.mass / b)), this.transform = It(this), c.transform = It(c);
          } else {
            let b = !this.isStatic && c.isStatic ? f : f.reverse();
            b.source.pos = b.source.pos.add(b.displacement), b.source.transform = It(b.source);
          }
          f.resolved = true, this.trigger("physicsResolve", f), c.trigger("physicsResolve", f.reverse());
        }
      }), this.onPhysicsResolve((c) => {
        C.gravity && (c.isBottom() && this.isFalling() ? (n.y = 0, s = c.target, a = c.target.pos, u ? u = false : this.trigger("ground", s)) : c.isTop() && this.isJumping() && (n.y = 0, this.trigger("headbutt", c.target)));
      });
    }, update() {
      if (!C.gravity || this.isStatic)
        return;
      if (u && (s = null, a = null, this.trigger("fallOff"), u = false), s)
        if (!this.isColliding(s) || !s.exists() || !s.is("body"))
          u = true;
        else {
          !s.pos.eq(a) && t.stickToPlatform !== false && this.moveBy(s.pos.sub(a)), a = s.pos;
          return;
        }
      let c = n.y;
      n.y += C.gravity * this.gravityScale * Ae(), n.y = Math.min(n.y, t.maxVelocity ?? Fs), c < 0 && n.y >= 0 && this.trigger("fall"), this.move(n);
    }, onPhysicsResolve(c) {
      return this.on("physicsResolve", c);
    }, onBeforePhysicsResolve(c) {
      return this.on("beforePhysicsResolve", c);
    }, curPlatform() {
      return s;
    }, isGrounded() {
      return s !== null;
    }, isFalling() {
      return n.y > 0;
    }, isJumping() {
      return n.y < 0;
    }, jump(c) {
      s = null, a = null, n.y = -c || -this.jumpForce;
    }, onGround(c) {
      return this.on("ground", c);
    }, onFall(c) {
      return this.on("fall", c);
    }, onFallOff(c) {
      return this.on("fallOff", c);
    }, onHeadbutt(c) {
      return this.on("headbutt", c);
    } };
  }
  i(Gs, "body");
  function Bs(t = 2) {
    let n = t;
    return { id: "doubleJump", require: ["body"], numJumps: t, add() {
      this.onGround(() => {
        n = this.numJumps;
      });
    }, doubleJump(s) {
      n <= 0 || (n < this.numJumps && this.trigger("doubleJump"), n--, this.jump(s));
    }, onDoubleJump(s) {
      return this.on("doubleJump", s);
    }, inspect() {
      return `${n}`;
    } };
  }
  i(Bs, "doubleJump");
  function Ls(t, n) {
    return { id: "shader", shader: t, ...typeof n == "function" ? { uniform: n(), update() {
      this.uniform = n();
    } } : { uniform: n } };
  }
  i(Ls, "shader");
  function Is() {
    return { id: "fixed", fixed: true };
  }
  i(Is, "fixed");
  function sr(t) {
    return { id: "stay", stay: true, scenesToStay: t };
  }
  i(sr, "stay");
  function Vs(t) {
    if (t == null)
      throw new Error("health() requires the initial amount of hp");
    let n = t;
    return { id: "health", hurt(s = 1) {
      this.setHP(t - s), this.trigger("hurt", s);
    }, heal(s = 1) {
      this.setHP(t + s), this.trigger("heal", s);
    }, hp() {
      return t;
    }, maxHP() {
      return n;
    }, setHP(s) {
      t = s, t <= 0 && this.trigger("death");
    }, onHurt(s) {
      return this.on("hurt", s);
    }, onHeal(s) {
      return this.on("heal", s);
    }, onDeath(s) {
      return this.on("death", s);
    }, inspect() {
      return `${t}`;
    } };
  }
  i(Vs, "health");
  function ks(t, n = {}) {
    if (t == null)
      throw new Error("lifespan() requires time");
    let s = n.fade ?? 0;
    return { id: "lifespan", async add() {
      await ur(t), s > 0 && this.opacity && await Rn(this.opacity, 0, s, (a) => this.opacity = a, yt.linear), this.destroy();
    } };
  }
  i(ks, "lifespan");
  function Ns(t, n, s) {
    if (!t)
      throw new Error("state() requires an initial state");
    let a = {};
    function u(p) {
      a[p] || (a[p] = { enter: new me, end: new me, update: new me, draw: new me });
    }
    i(u, "initStateEvents");
    function c(p, l, w) {
      return u(l), a[l][p].add(w);
    }
    i(c, "on");
    function f(p, l, ...w) {
      u(l), a[l][p].trigger(...w);
    }
    i(f, "trigger");
    let b = false;
    return { id: "state", state: t, enterState(p, ...l) {
      if (b = true, n && !n.includes(p))
        throw new Error(`State not found: ${p}`);
      let w = this.state;
      if (s) {
        if (!s?.[w])
          return;
        let A = typeof s[w] == "string" ? [s[w]] : s[w];
        if (!A.includes(p))
          throw new Error(`Cannot transition state from "${w}" to "${p}". Available transitions: ${A.map((M) => `"${M}"`).join(", ")}`);
      }
      f("end", w, ...l), this.state = p, f("enter", p, ...l), f("enter", `${w} -> ${p}`, ...l);
    }, onStateTransition(p, l, w) {
      return c("enter", `${p} -> ${l}`, w);
    }, onStateEnter(p, l) {
      return c("enter", p, l);
    }, onStateUpdate(p, l) {
      return c("update", p, l);
    }, onStateDraw(p, l) {
      return c("draw", p, l);
    }, onStateEnd(p, l) {
      return c("end", p, l);
    }, update() {
      b || (f("enter", t), b = true), f("update", this.state);
    }, draw() {
      f("draw", this.state);
    }, inspect() {
      return this.state;
    } };
  }
  i(Ns, "state");
  function js(t = 1) {
    let n = 0, s = false;
    return { require: ["opacity"], add() {
      this.opacity = 0;
    }, update() {
      s || (n += Ae(), this.opacity = Ge(n, 0, t, 0, 1), n >= t && (this.opacity = 1, s = true));
    } };
  }
  i(js, "fadeIn");
  function _s(t = "intersect") {
    return { id: "mask", mask: t };
  }
  i(_s, "mask");
  function Tn(t) {
    _.loaded ? t() : C.events.on("load", t);
  }
  i(Tn, "onLoad");
  function Hs(t, n) {
    C.scenes[t] = n;
  }
  i(Hs, "scene");
  function qs(t, ...n) {
    if (!C.scenes[t])
      throw new Error(`Scene not found: ${t}`);
    C.events.onOnce("frameEnd", () => {
      C.events.trigger("sceneLeave", t), x.events.clear(), C.events.clear(), C.objEvents.clear(), [...C.root.children].forEach((s) => {
        (!s.stay || s.scenesToStay && !s.scenesToStay.includes(t)) && C.root.remove(s);
      }), C.root.clearEvents(), fr(), C.cam = { pos: null, scale: T(1), angle: 0, shake: 0, transform: new we }, C.scenes[t](...n);
    });
  }
  i(qs, "go");
  function $s(t) {
    return C.events.on("sceneLeave", t);
  }
  i($s, "onSceneLeave");
  function Ys(t, n) {
    try {
      return JSON.parse(window.localStorage[t]);
    } catch {
      return n ? (ir(t, n), n) : null;
    }
  }
  i(Ys, "getData");
  function ir(t, n) {
    window.localStorage[t] = JSON.stringify(n);
  }
  i(ir, "setData");
  function or(t, ...n) {
    let s = t(Ye), a;
    typeof s == "function" ? a = s(...n)(Ye) : a = s;
    for (let u in a)
      Ye[u] = a[u], r13.global !== false && (window[u] = a[u]);
    return Ye;
  }
  i(or, "plug");
  function jt() {
    return T(fe() / 2, ge() / 2);
  }
  i(jt, "center");
  let zs;
  ((P) => (P[P.None = 0] = "None", P[P.Left = 1] = "Left", P[P.Top = 2] = "Top", P[P.LeftTop = 3] = "LeftTop", P[P.Right = 4] = "Right", P[P.Horizontal = 5] = "Horizontal", P[P.RightTop = 6] = "RightTop", P[P.HorizontalTop = 7] = "HorizontalTop", P[P.Bottom = 8] = "Bottom", P[P.LeftBottom = 9] = "LeftBottom", P[P.Vertical = 10] = "Vertical", P[P.LeftVertical = 11] = "LeftVertical", P[P.RightBottom = 12] = "RightBottom", P[P.HorizontalBottom = 13] = "HorizontalBottom", P[P.RightVertical = 14] = "RightVertical", P[P.All = 15] = "All"))(zs ||= {});
  function ar(t = {}) {
    let n = T(0), s = t.isObstacle ?? false, a = t.cost ?? 0, u = t.edges ?? [], c = i(() => {
      let b = { left: 1, top: 2, right: 4, bottom: 8 };
      return u.map((p) => b[p] || 0).reduce((p, l) => p | l, 0);
    }, "getEdgeMask"), f = c();
    return { id: "tile", tilePosOffset: t.offset ?? T(0), set tilePos(b) {
      let p = this.getLevel();
      n = b.clone(), this.pos = T(this.tilePos.x * p.tileWidth(), this.tilePos.y * p.tileHeight()).add(this.tilePosOffset);
    }, get tilePos() {
      return n;
    }, set isObstacle(b) {
      s !== b && (s = b, this.getLevel().invalidateNavigationMap());
    }, get isObstacle() {
      return s;
    }, set cost(b) {
      a !== b && (a = b, this.getLevel().invalidateNavigationMap());
    }, get cost() {
      return a;
    }, set edges(b) {
      u = b, f = c(), this.getLevel().invalidateNavigationMap();
    }, get edges() {
      return u;
    }, get edgeMask() {
      return f;
    }, getLevel() {
      return this.parent;
    }, moveLeft() {
      this.tilePos = this.tilePos.add(T(-1, 0));
    }, moveRight() {
      this.tilePos = this.tilePos.add(T(1, 0));
    }, moveUp() {
      this.tilePos = this.tilePos.add(T(0, -1));
    }, moveDown() {
      this.tilePos = this.tilePos.add(T(0, 1));
    } };
  }
  i(ar, "tile");
  function Ks(t, n) {
    if (!n.tileWidth || !n.tileHeight)
      throw new Error("Must provide tileWidth and tileHeight.");
    let s = ft([kt(n.pos ?? T(0))]), a = t.length, u = 0, c = null, f = null, b = null, p = null, l = i((U) => U.x + U.y * u, "tile2Hash"), w = i((U) => T(Math.floor(U % u), Math.floor(U / u)), "hash2Tile"), A = i(() => {
      c = [];
      for (let U of s.children)
        M(U);
    }, "createSpatialMap"), M = i((U) => {
      let F = l(U.tilePos);
      c[F] ? c[F].push(U) : c[F] = [U];
    }, "insertIntoSpatialMap"), N = i((U) => {
      let F = l(U.tilePos);
      if (c[F]) {
        let G = c[F].indexOf(U);
        G >= 0 && c[F].splice(G, 1);
      }
    }, "removeFromSpatialMap"), V = i(() => {
      let U = false;
      for (let F of s.children) {
        let G = s.pos2Tile(F.pos);
        (F.tilePos.x != G.x || F.tilePos.y != G.y) && (U = true, N(F), F.tilePos.x = G.x, F.tilePos.y = G.y, M(F));
      }
      U && s.trigger("spatial_map_changed");
    }, "updateSpatialMap"), D = i(() => {
      let U = s.getSpatialMap(), F = s.numRows() * s.numColumns();
      f ? f.length = F : f = new Array(F), f.fill(1, 0, F);
      for (let G = 0;G < U.length; G++) {
        let B = U[G];
        if (B) {
          let K = 0;
          for (let Q of B)
            if (Q.isObstacle) {
              K = 1 / 0;
              break;
            } else
              K += Q.cost;
          f[G] = K || 1;
        }
      }
    }, "createCostMap"), P = i(() => {
      let U = s.getSpatialMap(), F = s.numRows() * s.numColumns();
      b ? b.length = F : b = new Array(F), b.fill(15, 0, F);
      for (let G = 0;G < U.length; G++) {
        let B = U[G];
        if (B) {
          let K = B.length, Q = 15;
          for (let ie = 0;ie < K; ie++)
            Q |= B[ie].edgeMask;
          b[G] = Q;
        }
      }
    }, "createEdgeMap"), se = i(() => {
      let U = s.numRows() * s.numColumns(), F = i((B, K) => {
        let Q = [];
        for (Q.push(B);Q.length > 0; ) {
          let ie = Q.pop();
          I(ie).forEach((he) => {
            p[he] < 0 && (p[he] = K, Q.push(he));
          });
        }
      }, "traverse");
      p ? p.length = U : p = new Array(U), p.fill(-1, 0, U);
      let G = 0;
      for (let B = 0;B < f.length; B++) {
        if (p[B] >= 0) {
          G++;
          continue;
        }
        F(B, G), G++;
      }
    }, "createConnectivityMap"), J = i((U, F) => f[F], "getCost"), $ = i((U, F) => {
      let G = w(U), B = w(F);
      return G.dist(B);
    }, "getHeuristic"), I = i((U, F) => {
      let G = [], B = Math.floor(U % u), K = B > 0 && b[U] & 1 && f[U - 1] !== 1 / 0, Q = U >= u && b[U] & 2 && f[U - u] !== 1 / 0, ie = B < u - 1 && b[U] & 4 && f[U + 1] !== 1 / 0, he = U < u * a - u - 1 && b[U] & 8 && f[U + u] !== 1 / 0;
      return F ? (K && (Q && G.push(U - u - 1), G.push(U - 1), he && G.push(U + u - 1)), Q && G.push(U - u), ie && (Q && G.push(U - u + 1), G.push(U + 1), he && G.push(U + u + 1)), he && G.push(U + u)) : (K && G.push(U - 1), Q && G.push(U - u), ie && G.push(U + 1), he && G.push(U + u)), G;
    }, "getNeighbours"), ce = { id: "level", tileWidth() {
      return n.tileWidth;
    }, tileHeight() {
      return n.tileHeight;
    }, spawn(U, ...F) {
      let G = T(...F), B = (() => {
        if (typeof U == "string") {
          if (n.tiles[U]) {
            if (typeof n.tiles[U] != "function")
              throw new Error("Level symbol def must be a function returning a component list");
            return n.tiles[U](G);
          } else if (n.wildcardTile)
            return n.wildcardTile(U, G);
        } else {
          if (Array.isArray(U))
            return U;
          throw new Error("Expected a symbol or a component list");
        }
      })();
      if (!B)
        return null;
      let K = false, Q = false;
      for (let he of B)
        he.id === "tile" && (Q = true), he.id === "pos" && (K = true);
      K || B.push(kt()), Q || B.push(ar());
      let ie = s.add(B);
      return K && (ie.tilePosOffset = ie.pos.clone()), ie.tilePos = G, c && (M(ie), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), ie;
    }, numColumns() {
      return u;
    }, numRows() {
      return a;
    }, levelWidth() {
      return u * this.tileWidth();
    }, levelHeight() {
      return a * this.tileHeight();
    }, tile2Pos(...U) {
      return T(...U).scale(this.tileWidth(), this.tileHeight());
    }, pos2Tile(...U) {
      let F = T(...U);
      return T(Math.floor(F.x / this.tileWidth()), Math.floor(F.y / this.tileHeight()));
    }, getSpatialMap() {
      return c || A(), c;
    }, onSpatialMapChanged(U) {
      return this.on("spatial_map_changed", U);
    }, onNavigationMapInvalid(U) {
      return this.on("navigation_map_invalid", U);
    }, getAt(U) {
      c || A();
      let F = l(U);
      return c[F] || [];
    }, update() {
      c && V();
    }, invalidateNavigationMap() {
      f = null, b = null, p = null;
    }, onNavigationMapChanged(U) {
      return this.on("navigation_map_changed", U);
    }, getTilePath(U, F, G = {}) {
      if (f || D(), b || P(), p || se(), U.x < 0 || U.x >= u || U.y < 0 || U.y >= a || F.x < 0 || F.x >= u || F.y < 0 || F.y >= a)
        return null;
      let B = l(U), K = l(F);
      if (f[K] === 1 / 0)
        return null;
      if (B === K)
        return [];
      if (p[B] != -1 && p[B] !== p[K])
        return null;
      let Q = new Ht((Oe, Dn) => Oe.cost < Dn.cost);
      Q.insert({ cost: 0, node: B });
      let ie = new Map;
      ie.set(B, B);
      let he = new Map;
      for (he.set(B, 0);Q.length !== 0; ) {
        let Oe = Q.remove()?.node;
        if (Oe === K)
          break;
        let Dn = I(Oe, G.allowDiagonals);
        for (let ze of Dn) {
          let Fn = (he.get(Oe) || 0) + J(Oe, ze) + $(ze, K);
          (!he.has(ze) || Fn < he.get(ze)) && (he.set(ze, Fn), Q.insert({ cost: Fn, node: ze }), ie.set(ze, Oe));
        }
      }
      let Mn = [], mt = K, mi = w(mt);
      for (Mn.push(mi);mt !== B; ) {
        mt = ie.get(mt);
        let Oe = w(mt);
        Mn.push(Oe);
      }
      return Mn.reverse();
    }, getPath(U, F, G = {}) {
      let B = this.tileWidth(), K = this.tileHeight(), Q = this.getTilePath(this.pos2Tile(U), this.pos2Tile(F), G);
      return Q ? [U, ...Q.slice(1, -1).map((ie) => ie.scale(B, K).add(B / 2, K / 2)), F] : null;
    } };
    return s.use(ce), s.onNavigationMapInvalid(() => {
      s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
    }), t.forEach((U, F) => {
      let G = U.split("");
      u = Math.max(G.length, u), G.forEach((B, K) => {
        s.spawn(B, T(K, F));
      });
    }), s;
  }
  i(Ks, "addLevel");
  function Xs(t = {}) {
    let n = null, s = null, a = null, u = null;
    return { id: "agent", require: ["pos", "tile"], agentSpeed: t.speed ?? 100, allowDiagonals: t.allowDiagonals ?? true, getDistanceToTarget() {
      return n ? this.pos.dist(n) : 0;
    }, getNextLocation() {
      return s && a ? s[a] : null;
    }, getPath() {
      return s ? s.slice() : null;
    }, getTarget() {
      return n;
    }, isNavigationFinished() {
      return s ? a === null : true;
    }, isTargetReachable() {
      return s !== null;
    }, isTargetReached() {
      return n ? this.pos.eq(n) : true;
    }, setTarget(c) {
      n = c, s = this.getLevel().getPath(this.pos, n, { allowDiagonals: this.allowDiagonals }), a = s ? 0 : null, s ? (u || (u = this.getLevel().onNavigationMapChanged(() => {
        s && a !== null && (s = this.getLevel().getPath(this.pos, n, { allowDiagonals: this.allowDiagonals }), a = s ? 0 : null, s ? this.trigger("navigation-next", this, s[a]) : this.trigger("navigation-ended", this));
      }), this.onDestroy(() => u.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, s[a])) : this.trigger("navigation-ended", this);
    }, update() {
      if (s && a !== null) {
        if (this.pos.sdist(s[a]) < 2)
          if (a === s.length - 1) {
            this.pos = n.clone(), a = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
            return;
          } else
            a++, this.trigger("navigation-next", this, s[a]);
        this.moveTo(s[a], this.agentSpeed);
      }
    }, onNavigationStarted(c) {
      return this.on("navigation-started", c);
    }, onNavigationNext(c) {
      return this.on("navigation-next", c);
    }, onNavigationEnded(c) {
      return this.on("navigation-ended", c);
    }, onTargetReached(c) {
      return this.on("target-reached", c);
    }, inspect() {
      return JSON.stringify({ target: JSON.stringify(n), path: JSON.stringify(s) });
    } };
  }
  i(Xs, "agent");
  function Ws(t) {
    let n = x.canvas().captureStream(t), s = te.ctx.createMediaStreamDestination();
    te.masterNode.connect(s);
    let a = new MediaRecorder(n), u = [];
    return a.ondataavailable = (c) => {
      c.data.size > 0 && u.push(c.data);
    }, a.onerror = () => {
      te.masterNode.disconnect(s), n.getTracks().forEach((c) => c.stop());
    }, a.start(), { resume() {
      a.resume();
    }, pause() {
      a.pause();
    }, stop() {
      return a.stop(), te.masterNode.disconnect(s), n.getTracks().forEach((c) => c.stop()), new Promise((c) => {
        a.onstop = () => {
          c(new Blob(u, { type: "video/mp4" }));
        };
      });
    }, download(c = "kaboom.mp4") {
      this.stop().then((f) => _n(c, f));
    } };
  }
  i(Ws, "record");
  function Js() {
    return document.activeElement === x.canvas();
  }
  i(Js, "isFocused");
  function Qs(t) {
    t.destroy();
  }
  i(Qs, "destroy");
  let ft = C.root.add.bind(C.root), Zs = C.root.readd.bind(C.root), ei = C.root.removeAll.bind(C.root), An = C.root.get.bind(C.root), ur = C.root.wait.bind(C.root), ti = C.root.loop.bind(C.root), Rn = C.root.tween.bind(C.root);
  function cr(t = 2, n = 1) {
    let s = 0;
    return { id: "boom", require: ["scale"], update() {
      let a = Math.sin(s * t) * n;
      a < 0 && this.destroy(), this.scale = T(a), s += Ae();
    } };
  }
  i(cr, "boom");
  let ni = _e(null, Vr), ri = _e(null, kr);
  function si(t, n = {}) {
    let s = ft([kt(t), sr()]), a = (n.speed || 1) * 5, u = n.scale || 1;
    s.add([Sn(ri), Nt(0), En("center"), cr(a, u), ...n.comps ?? []]);
    let c = s.add([Sn(ni), Nt(0), En("center"), Cn(), ...n.comps ?? []]);
    return c.wait(0.4 / a, () => c.use(cr(a, u))), c.onDestroy(() => s.destroy()), s;
  }
  i(si, "addKaboom");
  function hr() {
    C.root.update();
  }
  i(hr, "updateFrame");

  class Pn {
    static {
      i(this, "Collision");
    }
    source;
    target;
    displacement;
    resolved = false;
    constructor(n, s, a, u = false) {
      this.source = n, this.target = s, this.displacement = a, this.resolved = u;
    }
    reverse() {
      return new Pn(this.target, this.source, this.displacement.scale(-1), this.resolved);
    }
    hasOverlap() {
      return !this.displacement.isZero();
    }
    isLeft() {
      return this.displacement.x > 0;
    }
    isRight() {
      return this.displacement.x < 0;
    }
    isTop() {
      return this.displacement.y > 0;
    }
    isBottom() {
      return this.displacement.y < 0;
    }
    preventResolution() {
      this.resolved = true;
    }
  }
  function ii() {
    let t = {}, n = r13.hashGridSize || Ri, s = new we, a = [];
    function u(c) {
      if (a.push(s.clone()), c.pos && s.translate(c.pos), c.scale && s.scale(c.scale), c.angle && s.rotate(c.angle), c.transform = s.clone(), c.c("area") && !c.paused) {
        let f = c, p = f.worldArea().bbox(), l = Math.floor(p.pos.x / n), w = Math.floor(p.pos.y / n), A = Math.ceil((p.pos.x + p.width) / n), M = Math.ceil((p.pos.y + p.height) / n), N = new Set;
        for (let V = l;V <= A; V++)
          for (let D = w;D <= M; D++)
            if (!t[V])
              t[V] = {}, t[V][D] = [f];
            else if (!t[V][D])
              t[V][D] = [f];
            else {
              let P = t[V][D];
              e:
                for (let se of P) {
                  if (se.paused || !se.exists() || N.has(se.id))
                    continue;
                  for (let $ of f.collisionIgnore)
                    if (se.is($))
                      continue e;
                  for (let $ of se.collisionIgnore)
                    if (f.is($))
                      continue e;
                  let J = Tr(f.worldArea(), se.worldArea());
                  if (J) {
                    let $ = new Pn(f, se, J);
                    f.trigger("collideUpdate", se, $);
                    let I = $.reverse();
                    I.resolved = $.resolved, se.trigger("collideUpdate", f, I);
                  }
                  N.add(se.id);
                }
              P.push(f);
            }
      }
      c.children.forEach(u), s = a.pop();
    }
    i(u, "checkObj"), u(C.root);
  }
  i(ii, "checkFrame");
  function oi() {
    let t = C.cam, n = y.fromAngle(bt(0, 360)).scale(t.shake);
    t.shake = Fe(t.shake, 0, 5 * Ae()), t.transform = new we().translate(jt()).scale(t.scale).rotate(t.angle).translate((t.pos ?? jt()).scale(-1).add(n)), C.root.draw(), Ue();
  }
  i(oi, "drawFrame");
  function ai() {
    let t = be();
    C.events.numListeners("loading") > 0 ? C.events.trigger("loading", t) : Ne(() => {
      let n = fe() / 2, s = 24, a = T(fe() / 2, ge() / 2).sub(T(n / 2, s / 2));
      v({ pos: T(0), width: fe(), height: ge(), color: Z(0, 0, 0) }), v({ pos: a, width: n, height: s, fill: false, outline: { width: 4 } }), v({ pos: a, width: n * t, height: s });
    });
  }
  i(ai, "drawLoadScreen");
  function lr(t, n) {
    Ne(() => {
      let s = T(8);
      de(), H(t);
      let a = qe({ text: n, font: Zt, size: 16, pos: s, color: Z(255, 255, 255), fixed: true }), u = a.width + s.x * 2, c = a.height + s.x * 2;
      t.x + u >= fe() && H(T(-u, 0)), t.y + c >= ge() && H(T(0, -c)), v({ width: u, height: c, color: Z(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), $e(a), le();
    });
  }
  i(lr, "drawInspectText");
  function ui() {
    if (ne.inspect) {
      let t = null;
      for (let n of C.root.get("*", { recursive: true }))
        if (n.c("area") && n.isHovering()) {
          t = n;
          break;
        }
      if (C.root.drawInspect(), t) {
        let n = [], s = t.inspect();
        for (let a in s)
          s[a] ? n.push(`${a}: ${s[a]}`) : n.push(`${a}`);
        lr(Qr(Lt()), n.join(`
`));
      }
      lr(T(8), `FPS: ${ne.fps()}`);
    }
    ne.paused && Ne(() => {
      de(), H(fe(), 0), H(-8, 8);
      let t = 32;
      v({ width: t, height: t, anchor: "topright", color: Z(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let n = 1;n <= 2; n++)
        v({ width: 4, height: t * 0.6, anchor: "center", pos: T(-t / 3 * n, t * 0.5), color: Z(255, 255, 255), radius: 2, fixed: true });
      le();
    }), ne.timeScale !== 1 && Ne(() => {
      de(), H(fe(), ge()), H(-8, -8);
      let t = 8, n = qe({ text: ne.timeScale.toFixed(1), font: Zt, size: 16, color: Z(255, 255, 255), pos: T(-t), anchor: "botright", fixed: true });
      v({ width: n.width + t * 2 + t * 4, height: n.height + t * 2, anchor: "botright", color: Z(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let s = 0;s < 2; s++) {
        let a = ne.timeScale < 1;
        ae({ p1: T(-n.width - t * (a ? 2 : 3.5), -t), p2: T(-n.width - t * (a ? 2 : 3.5), -t - n.height), p3: T(-n.width - t * (a ? 3.5 : 2), -t - n.height / 2), pos: T(-s * t * 1 + (a ? -t * 0.5 : 0), 0), color: Z(255, 255, 255), fixed: true });
      }
      $e(n), le();
    }), ne.curRecording && Ne(() => {
      de(), H(0, ge()), H(24, -24), W({ radius: 12, color: Z(255, 0, 0), opacity: Ln(0, 1, x.time() * 4), fixed: true }), le();
    }), ne.showLog && C.logs.length > 0 && Ne(() => {
      de(), H(0, ge()), H(8, -8);
      let t = 8, n = [];
      for (let a of C.logs) {
        let u = "", c = a.msg instanceof Error ? "error" : "info";
        u += `[time]${a.time.toFixed(2)}[/time]`, u += " ", u += `[${c}]${a.msg?.toString ? a.msg.toString() : a.msg}[/${c}]`, n.push(u);
      }
      C.logs = C.logs.filter((a) => x.time() - a.time < (r13.logTime || Oi));
      let s = qe({ text: n.join(`
`), font: Zt, pos: T(t, -t), anchor: "botleft", size: 16, width: fe() * 0.6, lineSpacing: t / 2, fixed: true, styles: { time: { color: Z(127, 127, 127) }, info: { color: Z(255, 255, 255) }, error: { color: Z(255, 0, 127) } } });
      v({ width: s.width + t * 2, height: s.height + t * 2, anchor: "botleft", color: Z(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), $e(s), le();
    });
  }
  i(ui, "drawDebug");
  function ci(t) {
    C.events.on("loading", t);
  }
  i(ci, "onLoading");
  function hi(t) {
    x.onResize(t);
  }
  i(hi, "onResize");
  function li(t) {
    C.events.on("error", t);
  }
  i(li, "onError");
  function On(t) {
    te.ctx.suspend(), x.run(() => {
      Ne(() => {
        let a = fe(), u = ge(), c = { size: 36, width: a - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Zt, fixed: true };
        v({ width: a, height: u, color: Z(0, 0, 255), fixed: true });
        let f = qe({ ...c, text: "Error", pos: T(32), color: Z(255, 128, 0), fixed: true });
        $e(f), Zn({ ...c, text: t.message, pos: T(32, 32 + f.height + 16), fixed: true }), le(), C.events.trigger("error", t);
      });
    });
  }
  i(On, "handleErr");
  function di(t) {
    Y.push(t);
  }
  i(di, "onCleanup");
  function fi() {
    C.events.onOnce("frameEnd", () => {
      x.quit();
      for (let n in Ze)
        window.removeEventListener(n, Ze[n]);
      S.clear(S.COLOR_BUFFER_BIT | S.DEPTH_BUFFER_BIT | S.STENCIL_BUFFER_BIT);
      let t = S.getParameter(S.MAX_TEXTURE_IMAGE_UNITS);
      for (let n = 0;n < t; n++)
        S.activeTexture(S.TEXTURE0 + n), S.bindTexture(S.TEXTURE_2D, null), S.bindTexture(S.TEXTURE_CUBE_MAP, null);
      S.bindBuffer(S.ARRAY_BUFFER, null), S.bindBuffer(S.ELEMENT_ARRAY_BUFFER, null), S.bindRenderbuffer(S.RENDERBUFFER, null), S.bindFramebuffer(S.FRAMEBUFFER, null), q.destroy(), Y.forEach((n) => n());
    });
  }
  i(fi, "quit");
  let _t = true;
  x.run(() => {
    _.loaded || be() === 1 && !_t && (_.loaded = true, C.events.trigger("load")), !_.loaded && r13.loadingScreen !== false || _t ? (Ft(), ai(), ht()) : (ne.paused || hr(), ii(), Ft(), oi(), r13.debug !== false && ui(), ht()), _t && (_t = false), C.events.trigger("frameEnd");
  });
  function dr() {
    let t = O, n = S.drawingBufferWidth / t, s = S.drawingBufferHeight / t;
    if (r13.letterbox) {
      if (!r13.width || !r13.height)
        throw new Error("Letterboxing requires width and height defined.");
      let a = n / s, u = r13.width / r13.height;
      if (a > u) {
        let c = s * u, f = (n - c) / 2;
        E.viewport = { x: f, y: 0, width: c, height: s };
      } else {
        let c = n / u, f = (s - c) / 2;
        E.viewport = { x: 0, y: f, width: n, height: c };
      }
      return;
    }
    if (r13.stretch && (!r13.width || !r13.height))
      throw new Error("Stretching requires width and height defined.");
    E.viewport = { x: 0, y: 0, width: n, height: s };
  }
  i(dr, "updateViewport");
  function fr() {
    x.onHide(() => {
      r13.backgroundAudio || te.ctx.suspend();
    }), x.onShow(() => {
      r13.backgroundAudio || te.ctx.resume();
    }), x.onResize(() => {
      if (x.isFullscreen())
        return;
      let t = r13.width && r13.height;
      t && !r13.stretch && !r13.letterbox || (o.width = o.offsetWidth * O, o.height = o.offsetHeight * O, dr(), t || (E.frameBuffer.free(), E.frameBuffer = new st(q, S.drawingBufferWidth, S.drawingBufferHeight), E.width = S.drawingBufferWidth / O, E.height = S.drawingBufferHeight / O));
    }), r13.debug !== false && ds(), r13.burp && fs();
  }
  i(fr, "initEvents"), dr(), fr();
  let Ye = { VERSION: Ci, loadRoot: Xe, loadProgress: be, loadSprite: _e, loadSpriteAtlas: Et, loadSound: hn, loadBitmapFont: sn, loadFont: rn, loadShader: un, loadShaderURL: cn, loadAseprite: an, loadPedit: on, loadBean: ln, loadJSON: nn, load: Ve, getSprite: Ct, getSound: Tt, getFont: At, getBitmapFont: Rt, getShader: Pt, getAsset: dn, Asset: pe, SpriteData: z, SoundData: ee, width: fe, height: ge, center: jt, dt: Ae, time: x.time, screenshot: x.screenshot, record: Ws, isFocused: Js, setCursor: x.setCursor, getCursor: x.getCursor, setCursorLocked: x.setCursorLocked, isCursorLocked: x.isCursorLocked, setFullscreen: x.setFullscreen, isFullscreen: x.isFullscreen, isTouchscreen: x.isTouchscreen, onLoad: Tn, onLoading: ci, onResize: hi, onGamepadConnect: x.onGamepadConnect, onGamepadDisconnect: x.onGamepadDisconnect, onError: li, onCleanup: di, camPos: Zr, camScale: es, camRot: ts, shake: ns, toScreen: tr, toWorld: nr, setGravity: ms, getGravity: ps, setBackground: gs, getBackground: ws, getGamepads: x.getGamepads, add: ft, make: xn, destroy: Qs, destroyAll: ei, get: An, readd: Zs, pos: kt, scale: Nt, rotate: bs, color: vs, opacity: ys, anchor: En, area: Ts, sprite: Sn, text: As, rect: Rs, circle: Os, uvquad: Ps, outline: Ms, body: Gs, doubleJump: Bs, shader: Ls, timer: Cn, fixed: Is, stay: sr, health: Vs, lifespan: ks, z: xs, move: Es, offscreen: Cs, follow: Us, state: Ns, fadeIn: js, mask: _s, tile: ar, agent: Xs, on: je, onUpdate: rs, onDraw: ss, onAdd: Un, onDestroy: rr, onClick: us, onCollide: is, onCollideUpdate: os, onCollideEnd: as, onHover: cs, onHoverUpdate: hs, onHoverEnd: ls, onKeyDown: x.onKeyDown, onKeyPress: x.onKeyPress, onKeyPressRepeat: x.onKeyPressRepeat, onKeyRelease: x.onKeyRelease, onMouseDown: x.onMouseDown, onMousePress: x.onMousePress, onMouseRelease: x.onMouseRelease, onMouseMove: x.onMouseMove, onCharInput: x.onCharInput, onTouchStart: x.onTouchStart, onTouchMove: x.onTouchMove, onTouchEnd: x.onTouchEnd, onScroll: x.onScroll, onHide: x.onHide, onShow: x.onShow, onGamepadButtonDown: x.onGamepadButtonDown, onGamepadButtonPress: x.onGamepadButtonPress, onGamepadButtonRelease: x.onGamepadButtonRelease, onGamepadStick: x.onGamepadStick, mousePos: Lt, mouseDeltaPos: x.mouseDeltaPos, isKeyDown: x.isKeyDown, isKeyPressed: x.isKeyPressed, isKeyPressedRepeat: x.isKeyPressedRepeat, isKeyReleased: x.isKeyReleased, isMouseDown: x.isMouseDown, isMousePressed: x.isMousePressed, isMouseReleased: x.isMouseReleased, isMouseMoved: x.isMouseMoved, isGamepadButtonPressed: x.isGamepadButtonPressed, isGamepadButtonDown: x.isGamepadButtonDown, isGamepadButtonReleased: x.isGamepadButtonReleased, charInputted: x.charInputted, loop: ti, wait: ur, play: Mt, volume: pn, burp: Dt, audioCtx: te.ctx, Timer: xt, Line: Me, Rect: ue, Circle: wt, Polygon: Ke, Vec2: y, Color: X, Mat4: we, Quad: re, RNG: pt, rand: bt, randi: In, randSeed: br, vec2: T, rgb: Z, hsl2rgb: wr, quad: oe, choose: yr, chance: vr, lerp: Fe, tween: Rn, easings: yt, map: Ge, mapc: gr, wave: Ln, deg2rad: Re, rad2deg: nt, clamp: De, testLineLine: tt, testRectRect: xr, testRectLine: Ur, testRectPoint: gt, testCirclePolygon: Cr, testLinePoint: Er, testLineCircle: Vn, drawSprite: Gt, drawText: Zn, formatText: qe, drawRect: v, drawLine: R, drawLines: k, drawTriangle: ae, drawCircle: W, drawEllipse: Ee, drawUVQuad: ke, drawPolygon: ye, drawFormattedText: $e, drawMasked: Te, drawSubtracted: Qe, pushTransform: de, popTransform: le, pushTranslate: H, pushScale: xe, pushRotate: ve, pushMatrix: vn, usePostEffect: wn, debug: ne, scene: Hs, go: qs, onSceneLeave: $s, addLevel: Ks, getData: Ys, setData: ir, download: $t, downloadJSON: Ar, downloadText: jn, downloadBlob: _n, plug: or, ASCII_CHARS: Nr, canvas: x.canvas(), addKaboom: si, LEFT: y.LEFT, RIGHT: y.RIGHT, UP: y.UP, DOWN: y.DOWN, RED: X.RED, GREEN: X.GREEN, BLUE: X.BLUE, YELLOW: X.YELLOW, MAGENTA: X.MAGENTA, CYAN: X.CYAN, WHITE: X.WHITE, BLACK: X.BLACK, quit: fi, Event: me, EventHandler: Le, EventController: Be };
  if (r13.plugins && r13.plugins.forEach(or), r13.global !== false)
    for (let t in Ye)
      window[t] = Ye[t];
  return r13.focus !== false && x.canvas().focus(), Ye;
}, "default");

// src/utils.ts
var f = (func) => (arg) => {
  func(arg);
  return arg;
};
var gs = (g, s) => ({ g, s });
var log = f(console.log);
var addChild = (child) => f((obj) => obj.add(child));

// src/utils.
var createSmooth = ({
  startAt: current = 0,
  startDist: dist = current,
  ease = easings.linear,
  speed = 1,
  t = 0
}) => ({
  value: gs(() => current, (v) => current = v),
  speed: gs(() => speed, (v) => speed = v),
  dist: gs(() => dist, (v) => {
    dist = v;
    t = t < 0.5 ? t : 1 - t;
  }),
  update: () => {
    if (t >= 1)
      return t = 1;
    const t0at = (current - ease(t) * dist) / (1 - ease(t));
    const range = dist - t0at;
    t += dt() / speed;
    current = ease(t) * range + t0at;
  }
});
var smoothPos = (x, y2, ease = easings.linear) => {
  const smoothX = createSmooth({ startAt: x, ease });
  const smoothY = createSmooth({ startAt: y2, ease });
  return [
    pos(x, y2),
    {
      speed: gs(() => smoothX.speed.g(), (ve) => {
        smoothX.speed.s(ve);
        smoothY.speed.s(ve);
      }),
      dPos: gs(() => vec2(smoothX.dist.g(), smoothY.dist.g()), (ve) => {
        smoothX.dist.s(ve.x);
        smoothY.dist.s(ve.y);
      }),
      update() {
        smoothX.update();
        smoothY.update();
        this.moveTo(smoothX.value.g(), smoothY.value.g());
      },
      smoothTo(x2, y3) {
        smoothX.dist.s(x2);
        smoothY.dist.s(y3);
      },
      smoothBy(x2, y3) {
        smoothX.dist.s(x2);
        smoothY.dist.s(y3);
      }
    }
  ];
};

// src/utils.ts
var WIDTH = 384;
var HEIGHT = 216;
Lo({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth / WIDTH
});
var test = addChild(make([rect(100, 100)]))(add(smoothPos(0, 0, easings.easeInOutQuad)));
test.speed.s(5);
test.dPos.s(vec2(200, 100));
console.log(test.dPos.g());
