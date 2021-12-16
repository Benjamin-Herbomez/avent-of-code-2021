const util = require('util')

let raw = `E20D41802B2984BD00540010F82D09E35880350D61A41D3004E5611E585F40159ED7AD7C90CF6BD6BE49C802DEB00525272CC1927752698693DA7C70029C0081002140096028C5400F6023C9C00D601ED88070070030005C2201448400E400F40400C400A50801E20004C1000809D14700B67676EE661137ADC64FF2BBAD745B3F2D69026335E92A0053533D78932A9DFE23AC7858C028920A973785338832CFA200F47C81D2BBBC7F9A9E1802FE00ACBA44F4D1E775DDC19C8054D93B7E72DBE7006AA200C41A8510980010D8731720CB80132918319804738AB3A8D3E773C4A4015A498E680292B1852E753E2B29D97F0DE6008CB3D4D031802D2853400D24DEAE0137AB8210051D24EB600844B95C56781B3004F002B99D8F635379EDE273AF26972D4A5610BA51004C12D1E25D802F32313239377B37100105343327E8031802B801AA00021D07231C2F10076184668693AC6600BCD83E8025231D752E5ADE311008A4EA092754596C6789727F069F99A4645008247D2579388DCF53558AE4B76B257200AAB80107947E94789FE76E36402868803F0D62743F00043A1646288800084C3F8971308032996A2BD8023292DF8BE467BB3790047F2572EF004A699E6164C013A007C62848DE91CC6DB459B6B40087E530AB31EE633BD23180393CBF36333038E011CBCE73C6FB098F4956112C98864EA1C2801D2D0F319802D60088002190620E479100622E4358952D84510074C0188CF0923410021F1CE1146E3006E3FC578EE600A4B6C4B002449C97E92449C97E92459796EB4FF874400A9A16100A26CEA6D0E5E5EC8841C9B8FE37109C99818023A00A4FD8BA531586BB8B1DC9AE080293B6972B7FA444285CC00AE492BC910C1697B5BDD8425409700562F471201186C0120004322B42489A200D4138A71AA796D00374978FE07B2314E99BFB6E909678A0`;

//raw = `9C0141080250320F1802104A08`

let codes = {
    '0' : '0000',
    '1' : '0001',
    '2' : '0010',
    '3' : '0011',
    '4' : '0100',
    '5' : '0101',
    '6' : '0110',
    '7' : '0111',
    '8' : '1000',
    '9' : '1001',
    'A' : '1010',
    'B' : '1011',
    'C' : '1100',
    'D' : '1101',
    'E' : '1110',
    'F' : '1111',
}
//011 000 1 => v3
//  00000000010 => 2 children
//  000 000 0
//      000000000010110=>22
//      000 100 01010 => v0, 10 
//      101 100 01011 => v5, 11
//  001 000 1 => v1
//      000000000100001 => 33
//      000 110 00111000110100

//00000000000000000101100001000101011010001011

//110 000 0 000000001010100 => v=>6
//  000 000 0 000000000010110 => v0, 2    22
//      000 100 01010 => 0,10             11
//      110 100 01011 => 6,11             11
//  100 000 1 00000000010 => v4           
//      111 100 01100 => 7,12
//      000 100 01101 => 0,13

// 0,10 5,11  | 0,12 3,13

let bin = toBinary(raw);
//console.log(bin)

let packet = decodePacket(bin)

//console.log(util.inspect(packet, {showHidden: false, depth: null, colors: true}))
//console.log(addVersion(packet))
console.log(compute(packet))

function addVersion(packet){
    let r = packet.version;
    if(packet.children){
        for(let i=0;i<packet.children.length;++i){
            r+= addVersion(packet.children[i])
        }
    }
    return r;
}

function toBinary(packet){
    return packet.split('').reduce((a,b)=>a+codes[b], '')
}

function decodePacket(data){
    let version = toDecimal(data.substr(0,3))
    let type = data.substr(3,3)
    if(type=='100'){// literal
        let r = getLiteral(data.substr(6));
        return {
            type:'100', 
            version,
            value:r.v,
            s:r.s+6,
        }
    }else {// operator
        let subPacketType = data.substr(6,1)
        let children = (subPacketType == '0' ?
            getSubPacketType0(data.substr(7)) :
            getSubPacketType1(data.substr(7)))
        let s = children.s+7
        return {
            type,
            version,
            children: children.r,
            s,
        }
    }
}

function getSubPacketType0(data){
    let subLength = toDecimal(data.substr(0,15));
    let totalsize = 0
    let r = []
    do{
        let subPacket = decodePacket(data.substr(15+totalsize))
        r.push(subPacket)
        totalsize += subPacket.s
    }while(totalsize<subLength)
    return {r, s:15+totalsize};
}
function getSubPacketType1(data){
    let nbPackets = toDecimal(data.substr(0,11));
    let totalsize = 0
    let r = []
    for(let i=0;i<nbPackets;++i){
        let subPacket = decodePacket(data.substr(11+totalsize))
        r.push(subPacket)
        totalsize += subPacket.s
    }
    return {r, s:totalsize+11};
}

function getLiteral(data){
    let r = '';
    let finished = false;
    let i=0;
    do{
        let v = data.substr(i*5, 5)
        finished = v[0] == '0';
        r+=v.substr(1)
        i++;
        if(i > 10){
            break;
        }
    }while(!finished)
    return {v:toDecimal(r), s:i*5}
}

function toDecimal(number) {
    return number.split('')
        .map((v, i) => {
        return v * Math.pow(2, number.length - i - 1);
        })
        .reduce((a, b) => a + b, 0);
}


function compute(data){
    try{
        let r
        if(data.type == '100'){//literal
            r = data.value
        }
        if(data.type == '000' ){//add
            r = data.children.reduce((a,b)=>a+compute(b),0)
        }
        if(data.type == '001'){//multiply
            r = data.children.reduce((a,b)=>a*compute(b),1)
        }
        if(data.type == '010'){//min
            r = data.children.map(c=>compute(c)).sort((a,b)=>a-b)[0]
        }
        if(data.type == '011'){//max
            r = data.children.map(c=>compute(c)).sort((a,b)=>b-a)[0]
        }
        if(data.type == '101'){//gt
            r = compute(data.children[0]) > compute(data.children[1]) ? 1 : 0
        }
        if(data.type == '110'){//lt
            r = compute(data.children[0]) < compute(data.children[1]) ? 1 : 0
        }
        else if(data.type == '111'){
            
            r = compute(data.children[0]) == compute(data.children[1]) ? 1 : 0
        }
        return r
    }
    catch(error){
        console.error(error, data)
        throw error;
    }
}