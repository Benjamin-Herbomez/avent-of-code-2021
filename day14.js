let raw = `SHPPPVOFPBFCHHBKBNCV

HK -> C
SP -> H
VH -> K
KS -> B
BC -> S
PS -> K
PN -> S
NC -> F
CV -> B
SH -> K
SK -> H
KK -> O
HO -> V
HP -> C
HB -> S
NB -> N
HC -> K
SB -> O
SN -> C
BP -> H
FC -> V
CF -> C
FB -> F
VP -> S
PO -> N
HN -> N
BS -> O
NF -> H
BH -> O
NK -> B
KC -> B
OS -> S
BB -> S
SV -> K
CH -> B
OB -> K
FV -> B
CP -> V
FP -> C
VC -> K
FS -> S
SS -> F
VK -> C
SF -> B
VS -> B
CC -> P
SC -> S
HS -> K
CN -> C
BN -> N
BK -> B
FN -> H
OK -> S
FO -> S
VB -> C
FH -> S
KN -> K
CK -> B
KV -> P
NP -> P
CB -> N
KB -> C
FK -> K
BO -> O
OV -> B
OC -> B
NO -> F
VF -> V
VO -> B
FF -> K
PP -> O
VV -> K
PC -> N
OF -> S
PV -> P
PB -> C
KO -> V
BF -> N
OO -> K
NV -> P
PK -> V
BV -> C
HH -> K
PH -> S
OH -> B
HF -> S
NH -> H
NN -> K
KF -> H
ON -> N
PF -> H
CS -> H
CO -> O
SO -> K
HV -> N
NS -> N
KP -> S
OP -> N
KH -> P
VN -> H`

/*raw = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`; //*/

/*raw = `AA

AA -> B
AB -> A
BA -> A`;//*/


let data = raw.split('\n')
let first = data[0]
let transfo = data.slice(2).map(v => v.split(' -> '))


let poly = {}
for(let i=0;i<first.length-1;++i){
    if(!poly.hasOwnProperty(first.substr(i,2))){
        poly[first.substr(i,2)] = 0
    }
    poly[first.substr(i,2)] += 1
}


for(let i=0;i<40;++i){
    poly = applyTransfo(poly)
}
console.log('Poly,', poly)
let counts = countLetters(poly)
counts.find(v=>v.l == first[0]).nb += 1
counts.sort((a,b) => b.nb - a.nb)
console.log(counts)
console.log(counts[0].nb - counts[counts.length - 1].nb)

function applyTransfo(poly){
    let r = {}
    for(let i=0;i<transfo.length;++i){
        let t = transfo[i]
        let new1 = t[0][0] + t[1]
        let new2 = t[1] + t[0][1]
        if(!r.hasOwnProperty(t[0])){
            r[transfo[i][0]] = 0;
        }
        if(!r.hasOwnProperty(new1)){
            r[new1] = 0;
        }
        if(!r.hasOwnProperty(new2)){
            r[new2] = 0;
        }

        let add = poly[t[0]]
        if(add == undefined) add = 0
        r[new1] += add
        r[new2] += add
    }
    return r;
}

function countLetters(poly){
    let r = []
    for(let key in poly){
        if(!r.find(v=>v.l == key[1])){
            r.push({l:key[1], nb:0})
        }
        r.find(v=>v.l == key[1]).nb += poly[key]
    }
    return r;
}