let raw= ``

raw= `Player 1 starting position: 4
Player 2 starting position: 8`

let data = raw.split('\n').map(v=>v.replace(' starting position: ', '#').split('#'))

console.log(getWins(7,9,0,0,{}))

function getWins(pos1, pos2, score1, score2, memory){
    if(memory.hasOwnProperty(pos1) && memory[pos1].hasOwnProperty(pos2) &&
        memory[pos1][pos2].hasOwnProperty(score1)&& memory[pos1][pos2][score1].hasOwnProperty(score2)){
            return memory[pos1][pos2][score1][score2]
    }
    if(score1 >= 21){
        return [1,0]
    }
    if(score2>= 21){
        return [0,1]
    }
    let r = [0,0]
    for(let d1=3;d1>=1;--d1){
        for(let d2=3;d2>=1;--d2){
            for(let d3=3;d3>=1;--d3){
                let newPos1 = pos1+d1+d2+d3;
                newPos1 %= 10
                let newScore1 = score1+newPos1+1
                if(newScore1 >= 21){
                    r[0]+=1
                }
                else{
                    for(let d12=3;d12>=1;--d12){
                        for(let d22=3;d22>=1;--d22){
                            for(let d32=3;d32>=1;--d32){
                                
    
                                let newPos2 = pos2+d12+d22+d32;
                                newPos2 %= 10
                                let newScore2 = score2+newPos2+1
                                let next = getWins(newPos1, newPos2, newScore1, newScore2, memory)
                                r[0]+=next[0]
                                r[1]+=next[1]
                            }
                        }
                    }
                } 
            }
        }
    }
    if(!memory.hasOwnProperty(pos1)){
        memory[pos1] = {}
    }
    if(!memory[pos1].hasOwnProperty(pos2)){
        memory[pos1][pos2] = {}
    }
    if(!memory[pos1][pos2].hasOwnProperty(score1)){
        memory[pos1][pos2][score1] = {}
    }
    memory[pos1][pos2][score1][score2] = r;
    return r;
}

/*data = data.map(v=>({player:v[0], position:+v[1]-1, score:0}))

let resultTable = {}
for(let position1=9;position1>=0;--position1){
    for(let position2=9;position2>=0;--position2){
        for(let score1=21;score1>=0;--score1){
            for(let score2=21;score2>=0;--score2){
                for(let d1=3;d1>=1;--d1){
                    for(let d2=3;d2>=0;--d2){
                        for(let d3=3;d3>=0;--d3){
                            if(score1+(position1+d1+d2+d3)%10+1 >= 21){
                                if(resultTable.hasOwnProperty('p1')){
                                    resultTable.p1 = {}
                                }
                                resultTable.p1[position1]
                                resultTable.push({
                                    position1Init:position1,
                                    position2Init: position2,
                                    score1Init:score1,
                                    score2Init:score2,
                                    position1:(position1+d1+d2+d3)%10,
                                    score1:score1+(position1+d1+d2+d3)%10+1,
                                    wins: [1,0]
                                })
                            }
                            else{
                                for(let d12=3;d12>=0;--d12){
                                    for(let d22=3;d22>=0;--d22){
                                        for(let d32=3;d32>=0;--d32){
                                            let r = {
                                                position1Init:position1,
                                                position2Init: position2,
                                                score1Init:score1,
                                                score2Init:score2,
                                                position1:(position1+d1+d2+d3)%10,
                                                position2:(position2+d12+d22+d32)%10,
                                                score1:score1+(position1+d1+d2+d3)%10+1,
                                                score2:score2+(position2+d12+d22+d32)%10+1,
                                                wins: null
                                            }
                                            if(score1 >= 21){
                                                r.wins=[1,0]
                                            }
                                            else if(score2 >= 21){
                                                r.wins=[0,1]
                                            }
                                            resultTable.push(r)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
console.log('resultTable', resultTable.length)
console.log(resultTable[resultTable.length-1])
reduceWins()
console.log('player1',resultTable.filter(v=>v.position1Init === 3 && v.score1Init === 0))
console.log('player1',resultTable.filter(v=>v.position1Init === 7 && v.score1Init === 0))
console.log('player1',resultTable.filter(v=>v.position1Init === 9 && v.score1Init === 0))

function toTree(){

}

function reduceWins(){
    let nbSkip = 0;
    for(let i = resultTable.length-1;i>=0;--i){
        if(i%1000 == 0){console.log('index',i)}
        if(nbSkip%100 == 99){console.log('skips',nbSkip)}
        let entry = resultTable[i]
        if(entry.wins !== null){
            ++nbSkip
            continue;
        }
        reachableEnds = resultTable.slice(i).filter(v=> v.wins !== null && (
                v.wins[0]>0 && v.position1Init === entry.position1 && v.score1Init === entry.score1
                || 
                v.wins[1]>0 && v.position2Init === entry.position2 && v.score2Init === entry.score2
            )
        )
        if(reachableEnds !== null && reachableEnds.length > 0){
            console.log('reachableEnds', reachableEnds.length)
            entry.wins = reachableEnds.reduce((a,b)=>[a[0]+b[0], a[1]+b[1]], [0,1])
        }
    }
}*/

/*
console.log(data)
//console.log(playGame(data))
let r = playGameDirac(data, 0, 21);
console.log(r.filter(d=>d[0].win))

function getDiracWin(data, player, goal){
    if(data.player() >= goal - 3){

    }
}

function playGameDirac(data){
    let gameData = data.map(v=>({
        ...v, position:v.starting, score:0, win: false
    }))
    return playTurnDirac(gameData, 0)
}
function playTurnDirac(gameData, player){
    if(gameData[player].score >= 21){
        gameData[player].win = true
        return gameData
    }
    let r = []
    for(let d1=1;d1>=0;++d1){
        for(let d2=1;d1>=0;++d2){
            for(let d3=1;d1>=0;++d3){
                let score = d1+d2+d3;
                let toAdd = [{...gameData[0]}, {...gameData[1]}]
                playTurn(toAdd[player], score)
                r.push(playTurnDirac(toAdd, 1-player))
            }  
        }  
    }
    return r.flat();
}
/*
function playGame(data){
   
    let dice = 0;
    let nbDiceRoll = 0;
    do{
        for(let i=0;i<data.length;++i){
            dice = rollDice(dice)
            let score = 0+dice;
            dice = rollDice(dice)
            score+=dice;
            dice = rollDice(dice)
            score+=dice;
            nbDiceRoll+= 3
            playTurn(gameData[i], score)
            if(winning(gameData)){
                console.log(nbDiceRoll, gameData)
                return gameData
            }
            console.log(gameData, dice, i, score)
        }
    }while(true)
}

function winning(gameData){
    return gameData.findIndex(v=>v.score >= 1000) !== -1
}

function playTurn(player, score){
    player.position += score
    player.position %= 10
    player.score += player.position + 1
}

function rollDice(value){
    value+=1;
    if(value > 100){
        value = 1;
    }
    return value;
}*/