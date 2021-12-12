let raw = `qi-UD
jt-br
wb-TF
VO-aa
UD-aa
br-end
end-HA
qi-br
br-HA
UD-start
TF-qi
br-hf
VO-hf
start-qi
end-aa
hf-HA
hf-UD
aa-hf
TF-hf
VO-start
wb-aa
UD-wb
KX-wb
qi-VO
br-TF`;

raw = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`; //*/

let data = raw.split('\n').map((v) => v.split('-'));
let starts = data.filter((v) => v[0] == 'start' || v[1] == 'start');
let ends = data.filter((v) => v[0] == 'end' || v[1] == 'end');
data = data.map((d) =>
  d.map((c) => ({
    c,
    isBig: c.match(/[A-Z]/g) !== null,
  }))
);

let result = getAllPaths();

let resultWithSmall = result.filter(
  (path) =>
    path.find((v) => v != 'start' && v != 'end' && v.toLowerCase() == v) != null
);
console.log(resultWithSmall, resultWithSmall.length);

function getAllPaths() {
  let tree = buildTree('start', []);
  return treeToArray(tree).filter((path) => path[path.length - 1] == 'end');
}

function buildTree(start, pile) {
  let r = { leaf: start, children: [] };

  for (let i = 0; i < data.length; ++i) {
    const path = data[i];
    if (path[0].c != start && path[1].c != start) {
      continue;
    }
    let s = path[0].c == start ? path[0] : path[1];
    let e = path[0].c == start ? path[1] : path[0];
    if (canAddToPath(e.c, pile)) {
      continue;
    }

    let pile2 = [...pile];
    if (!s.isBig) {
      let index = pile2.findIndex((v) => v.v == s.c);
      if (index >= 0) {
        pile2[0].nb += 1;
      } else {
        pile2.push({ v: s.c, nb: 1 });
      }
    }
    if (!e.isBig) {
      pile2.push(e.c);
      let index = pile2.findIndex((v) => v.v == e.c);
      if (index >= 0) {
        pile2[0].nb += 1;
      } else {
        pile2.push({ v: e.c, nb: 1 });
      }
    }
    r.children = r.children.concat(buildTree(e.c, pile2));
  }
  return r;
}

function treeToArray(tree) {
  if (
    tree.leaf == 'end' ||
    tree.children == undefined ||
    tree.children == null ||
    tree.children.length === 0
  ) {
    return [tree.leaf];
  }

  let result = [];
  for (let i = 0; i < tree.children.length; ++i) {
    let subR = treeToArray(tree.children[i]);
    if (subR !== null && subR !== undefined) {
      for (let k = 0; k < subR.length; ++k) {
        result.push([tree.leaf].concat(subR[k]));
      }
    }
  }
  return result;
}

function canAddToPath(value, pile) {
  return !pile.some((p) => p.v == value) || !pile.some((p) => p.nb > 1);
}
