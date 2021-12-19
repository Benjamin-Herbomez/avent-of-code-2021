let raw = `target area: x=117..164, y=-140..-89`

//raw = `target area: x=20..30, y=-10..-5`//*/

let data = raw.replace('target area: x=', '').replace('y=', '').split(', ').map(v=>v.split('..')).flat()

console.log(data)
let r = [];
let max = getMaxY(data).y;
for(let y=-max;y<max;++y){
    for(let x=0;x<=data[1];++x){
        if(doesIt(x,y, data)){
            r.push({x,y})
        }
    }
}
console.log(r.length);


function getMaxY(data){
    let maxY = null
    let y=0;
    let nbMiss = 0
    let initiaYs = []
    m:do{
        let yaM = (y+1)*y/2;
        let yaF = 0+yaM;
        let dy = 0;
        tryF: do{
            if(yaF <= data[3] && yaF >= data[2]){
                maxY = yaM;
                break tryF;
            }
            else if(yaF < data[2] ){
                if(nbMiss > 1000){
                    missed = true;
                    break m;
                }
                ++nbMiss
                break tryF;
            }
            ++dy;
            yaF -= dy;
        }while(true);
        ++y;
    }while(true)
    return {y, maxY};
}

function doesIt(x,y,data){
    let px = 0, py = 0, dx=x, dy=y;
    do{
        px += dx
        py += dy;
        if(px >= data[0] && px <= data[1] && py <= data[3] && py>= data[2]){
            return true;
        }
        if(dx > 0){
            --dx
        }
        --dy
    }while(px <= data[1] && py > data[2])
    return false;
}
