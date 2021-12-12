let raw = ``;

raw = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`; //*/

let data = raw.split('\n');
let starts = data
  .filter((v) => v.startsWith('start-') || v.endsWith('-start'))
  .map((v) => v.replace('start-', '').replace('-start', ''));
let ends = data
  .filter((v) => v.startsWith('end-') || v.endsWith('-end'))
  .map((v) => v.replace('end-', '').replace('-end', ''));
let paths = data
  .filter(
    (v) =>
      !v.startsWith('start-') &&
      !v.endsWith('-start') &&
      !v.startsWith('end-') &&
      !v.endsWith('-end')
  )
  .map((v) =>
    v.split('-').map((c) => ({ c, isBig: c.match(/[A-Z]/g) !== null }))
  );

console.log(starts, paths, ends);

let result = [];
for (let s = 0; s < starts.length; ++s) {
  for (let e = 0; e < ends.length; ++e) {
    let sr = getAllPaths(starts[s], ends[e]).filter(
      (p) => p[p.length - 1] == ends[e]
    );
    console.log(sr);
    result = result.concat(sr);
  }
}

console.log(result, result.length);

function getAllPaths(start, end) {
  let tree = buildTree(start, end, []);
  //console.log(JSON.stringify(tree));
  return treeToArray(tree);
}

function buildTree(start, end, pile) {
  let r = { leaf: start, children: [] };

  for (let i = 0; i < paths.length; ++i) {
    if (paths[i][0].c == start && !pile.includes(paths[i][1].c)) {
      if (ends.includes(paths[i][1])) {
        r.children.push({ leaf: paths[i][1].c });
      }
      let pile2 = [...pile];
      if (!paths[i][0].isBig) {
        pile2.push(paths[i][0].c);
      }
      if (!paths[i][1].isBig) {
        pile2.push(paths[i][1].c);
      }
      r.children.push(buildTree(paths[i][1].c, end, pile2));
    }
    if (paths[i][1].c == start && !pile.includes(paths[i][0].c)) {
      if (ends.includes(paths[i][0])) {
        r.children.push({ leaf: paths[i][0].c });
      }
      let pile2 = [...pile];
      if (!paths[i][0].isBig) {
        pile2.push(paths[i][0].c);
      }
      if (!paths[i][1].isBig) {
        pile2.push(paths[i][1].c);
      }
      r.children.push(buildTree(paths[i][0].c, end, pile2));
    }
  }
  return r;
}

function treeToArray(tree) {
  if (tree.children == undefined || tree.children == null) {
    return [tree.leaf];
  }
  return [tree.leaf].concat(tree.children.map((v) => treeToArray(v)).flat());
}
