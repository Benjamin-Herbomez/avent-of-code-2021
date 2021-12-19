const util = require('util')
const ACTION = {
    NOTHING     : 0,
    EXPLODE     : 1,
    SPLIT       : 2,
    DONE        : 100
}

let raw= `[[[[2,8],[4,6]],[[2,4],[9,4]]],[[[0,6],[4,6]],[1,6]]]
[7,[[5,7],1]]
[[[[8,8],7],5],[[[5,6],1],6]]
[[[8,5],[[0,0],[4,9]]],[2,8]]
[7,[[5,2],[[3,0],[7,7]]]]
[[6,[6,8]],[3,[5,2]]]
[6,[[[8,9],[9,9]],[3,8]]]
[[[1,[0,2]],[7,[3,0]]],8]
[[9,6],6]
[[[2,3],1],[9,[3,7]]]
[5,[[[5,8],3],9]]
[[[[8,8],3],[2,2]],[2,3]]
[[[4,9],3],[[[7,3],8],5]]
[[[3,5],[3,7]],[[[9,7],9],[9,[7,8]]]]
[[7,1],8]
[0,[[[6,8],[1,1]],[1,[5,8]]]]
[[[[2,2],[9,5]],[0,[1,0]]],[4,[[2,4],4]]]
[[[[2,5],[7,3]],[7,6]],[[6,[4,4]],[3,8]]]
[[3,[[7,9],2]],[[0,[4,4]],[[6,9],9]]]
[[[7,7],[[1,4],[1,6]]],[7,[[6,3],6]]]
[[0,8],[[[1,6],2],4]]
[[0,[[2,7],[0,4]]],[[[3,8],[7,7]],5]]
[[[[9,9],[1,3]],[9,[4,3]]],[[[3,4],[6,4]],1]]
[[[9,[0,9]],[2,[7,6]]],[2,[[1,9],[3,3]]]]
[[4,[5,6]],[[[1,5],6],[[1,5],[5,2]]]]
[1,[[3,[2,1]],5]]
[[4,[3,8]],[3,[6,3]]]
[[7,1],[[3,[6,0]],[5,[1,1]]]]
[[8,7],[[[0,1],[2,6]],[5,[4,7]]]]
[9,[[[1,6],[8,9]],[6,6]]]
[4,9]
[[[[0,8],[8,5]],9],[7,[1,3]]]
[[[[8,5],0],[[4,6],4]],[8,4]]
[[[[8,9],8],[[3,1],[7,6]]],2]
[[[[6,3],0],[2,[4,8]]],[[[0,3],[3,5]],4]]
[0,[[9,[0,6]],5]]
[[[[1,9],[2,7]],[[4,0],[9,9]]],[[8,[3,6]],[3,4]]]
[[[[0,7],[8,4]],1],[[8,3],[[3,5],[8,0]]]]
[[[[3,5],4],[0,9]],[[[1,7],5],[9,[8,0]]]]
[[[8,[6,8]],[[3,7],[0,8]]],[[[5,2],[1,7]],[9,5]]]
[[[[5,1],[0,7]],4],[0,4]]
[[[[9,8],[3,9]],[[0,6],3]],[[[9,1],[8,7]],2]]
[[9,[[0,3],6]],[[3,4],[[8,9],5]]]
[[1,[1,8]],[[6,[4,2]],1]]
[7,[[1,[5,2]],[[9,7],0]]]
[0,[8,6]]
[1,4]
[[8,[4,1]],[[[4,0],[0,0]],[7,[3,4]]]]
[2,[[1,[1,8]],[[3,4],1]]]
[[8,[[1,2],[3,1]]],[[[4,4],[7,9]],1]]
[[4,[0,[6,4]]],[9,[0,[1,2]]]]
[[6,[3,1]],[[7,8],[8,[2,5]]]]
[[[2,[3,3]],[[6,4],[9,4]]],[[[1,5],[7,4]],[0,6]]]
[[[[8,0],3],[[4,0],3]],[[7,5],4]]
[[[2,[4,3]],[[2,1],5]],1]
[[[8,1],[0,4]],[9,[[1,4],[9,0]]]]
[[[5,0],[[7,7],9]],[[6,[6,2]],7]]
[[[[5,9],0],[[4,6],[3,8]]],[6,[6,5]]]
[[[6,[7,8]],[5,3]],[[3,[6,5]],[[8,7],[4,7]]]]
[[9,[[8,7],4]],[[[6,3],0],[[2,3],[5,9]]]]
[[[[1,8],6],1],[[[7,8],4],[7,2]]]
[[[[7,1],[6,2]],[[7,8],2]],0]
[[[4,5],[0,3]],[[2,4],1]]
[[[9,1],7],[[[8,8],[0,7]],[8,0]]]
[[5,[[7,5],[7,5]]],[3,[4,8]]]
[[7,[1,0]],[[3,[1,5]],0]]
[[[5,1],[[5,2],[7,3]]],[[7,[3,9]],9]]
[5,[1,[[9,9],[3,0]]]]
[[2,0],[9,[6,[3,3]]]]
[[[[0,4],[4,8]],[[1,9],[5,8]]],[[[7,0],5],[5,1]]]
[[[[1,5],[9,2]],[6,[3,6]]],[4,[1,[1,5]]]]
[[[[1,4],[4,6]],[[5,5],[3,5]]],[[[7,1],4],[[0,7],4]]]
[[6,[3,5]],1]
[8,[[1,[0,7]],[[2,5],6]]]
[[[[1,6],3],[[9,7],9]],[[7,8],3]]
[[[[9,9],[2,0]],0],[1,4]]
[[[[1,3],[5,1]],[[0,4],2]],0]
[[3,2],[7,[[9,3],8]]]
[[9,0],[4,[[8,7],[5,5]]]]
[[[[7,4],8],[[4,4],1]],9]
[[9,[[7,9],1]],[[[6,5],7],[[2,5],2]]]
[7,2]
[[[6,6],[[9,4],4]],6]
[[1,[[5,0],3]],[5,[4,4]]]
[[[3,2],[[4,6],6]],[[3,[9,5]],[[0,2],[4,6]]]]
[5,[[0,[3,0]],[7,[7,9]]]]
[[[[0,4],[1,5]],4],[8,[[4,7],8]]]
[[[[9,1],0],0],4]
[[[[8,4],[4,2]],[9,[1,7]]],[6,3]]
[2,[[[8,3],2],[[3,1],8]]]
[[[[9,0],[7,8]],[[2,7],[0,3]]],[[[8,5],3],[9,[6,8]]]]
[[[[8,9],[9,1]],[4,[0,1]]],[[[7,8],2],2]]
[[[[2,2],[4,1]],[2,[2,8]]],[[[6,5],1],9]]
[[[[3,0],7],7],[[[9,3],7],4]]
[[[[7,5],1],3],[[[0,7],7],[[2,6],[9,9]]]]
[[[[5,2],8],[9,[8,8]]],[2,[[0,8],[5,6]]]]
[[[[7,7],[1,2]],[6,6]],[8,[5,8]]]
[[7,[4,[8,9]]],[[4,[7,2]],8]]
[[[6,4],[7,7]],[[[3,7],0],[0,1]]]
[[1,[5,9]],[8,[4,6]]]`

let data = raw.split('\n')


let numbers = data.map(v=>parse(v));
//numbers.forEach(v=>console.log(numberToTxt(v)))
/*let n=numbers.slice(1).reduce((l,r)=> reduce({l,r}), numbers[0])
console.log(getMagniture(n))
console.log(numberToTxt(n))
console.log('#{"########"')
*/
let maxMagn=0;
let maxNumber
for(let x=0;x<numbers.length;++x){
    for(let y=x+1;y<numbers.length;++y){
        let number = reduce({l:copy(numbers[x]),r:copy(numbers[y])})
        let mag = getMagniture(number)

        if(mag > maxMagn){
            maxMagn = mag
            maxNumber = number
        }
        number = reduce({l:copy(numbers[y]),r:copy(numbers[x])})
        mag = getMagniture(number)
        if(x==0 && y==8){
            console.log(numberToTxt(numbers[x]))
            console.log(numberToTxt(numbers[y]))
        }
        if(mag > maxMagn){
            maxMagn = mag
            maxNumber = number
        }
    }
}
console.log(maxMagn, numberToTxt(maxNumber))

function copy(number){
    return JSON.parse(JSON.stringify(number));
}

function parse(data){
    let arr = eval(data).map(v=>{
        if(Array.isArray(v)){
            return parse(v)
        }
        return v
    })
    return {l:arr[0], r:arr[1]}
}

function reduce(number){
    let r
    let result = number//JSON.parse(JSON.stringify(number));
    do {
        r = doReduceExplode(result, 0)
        if(r.a === ACTION.NOTHING){
            r = doReduceSplit(number);
        }
        result = r.number
    }while(r.a !== ACTION.NOTHING)
    return result;
}

function doReduceExplode(number, deepth){
    if(Number.isInteger(number)){
        return {a:ACTION.NOTHING, number}
    }
    if(isPair(number)){
        if(deepth > 3){
            return {a:ACTION.EXPLODE, number:0, l:number.l, r:number.r}
        }
        return {a:ACTION.NOTHING, number}
    }
    let actionL = doReduceExplode(number.l, deepth+1)
    number.l = actionL.number;
    if(actionL.a === ACTION.EXPLODE){
        if(actionL.r !== null){
            number.r = addToLeft(number.r, actionL.r)
            actionL.r = null;
        }
        if(actionL.l !== null){
            return {...actionL, number}
        }
    }

    if(actionL.a !== ACTION.NOTHING){
        return {a:ACTION.DONE, number}
    }
    let actionR = doReduceExplode(number.r, deepth+1)
    number.r = actionR.number;
    if(actionR.a === ACTION.EXPLODE){
        if(actionR.l !== null){
            number.l = addToRight(number.l, actionR.l)
            actionR.l = null;
        }
        if(actionR.r !== null){
            return {...actionR, number}
        }
    }
    if(actionR.a !== ACTION.NOTHING){
        return {a:ACTION.DONE, number}
    }
    return {a:ACTION.NOTHING, number}
}

function doReduceSplit(number){
    if(Number.isInteger(number)){
        if(number > 9){
            return {
                a:ACTION.SPLIT,
                number:{
                    l:Math.floor(number/2.0),
                    r:Math.ceil(number/2.0)
                }
            }
        }
        return {a:ACTION.NOTHING, number}
    }
    let actionL = doReduceSplit(number.l)
    number.l = actionL.number;
    if(actionL.a !== ACTION.NOTHING){
        return {a:ACTION.DONE, number}
    }

    let actionR = doReduceSplit(number.r)
    number.r = actionR.number;
    if(actionR.a !== ACTION.NOTHING){
        return {a:ACTION.DONE, number}
    }
    return {a:ACTION.NOTHING, number}
}

function isPair(number){
    return !Number.isInteger(number) &&
        Number.isInteger(number.l) &&
        Number.isInteger(number.r)
}

function getMagniture(number){
    if(Number.isInteger(number)){
        return number;
    }
    return 3*getMagniture(number.l)+2*getMagniture(number.r)
}

function addToLeft(number, toAdd){
    if(Number.isInteger(number)){
        return number+toAdd
    }
    return {l:addToLeft(number.l, toAdd), r:number.r}
}

function addToRight(number, toAdd){
    if(Number.isInteger(number)){
        return number+toAdd
    }
    return {l:number.l, r:addToRight(number.r, toAdd)}
}

function numberToTxt(number){
    if(Number.isInteger(number)){
        return number;
    }
    return '['+numberToTxt(number.l)+','+numberToTxt(number.r)+']'
}
