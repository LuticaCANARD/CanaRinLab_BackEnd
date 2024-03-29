import {test, expect} from "bun:test";
import {SuppleMember} from './Discord/command/Casino/CasinoShupple'

test("멤버 셔플링",()=>{
    const memberList :{ 
    name: string;
    userId: string;
    }[] = [
        {
            name: "Luti1",
            userId: "abcde"
        },
        {
            name: "Lutid2",
            userId: "fghi"
        },        {
            name: "Lugti3",
            userId: "bgf"
        },        {
            name: "Lutti4",
            userId: "fea"
        },        {
            name: "Lut5i5",
            userId: "lop;"
        },
    ]
    const role_ :{
        RoleName: string;
        userId: string;
        Priority: number;
    }[] = [

        {
            RoleName: "1",
            userId: "2",
            Priority: 1,
        },
        {
            RoleName: "2",
            userId: "2",
            Priority: 2,
        },        {
            RoleName: "3",
            userId: "2",
            Priority: 3,
        },        {
            RoleName: "4",
            userId: "2",
            Priority: 4,
        },        {
            RoleName: "5",
            userId: "2",
            Priority: 5,
        },        {
            RoleName: "6",
            userId: "2",
            Priority: 6,
        },
    ]
    const joinner = new Map();
    memberList.forEach(element => {
        joinner.set(element,true);
    });

    console.log('--')
    for(let c=0;c<1000;c++){
        if(SuppleMember(new Map(),joinner,memberList,role_,true)){
            console.log('cc');
            break;
        }
    }
    console.log('ok')
    console.log(SuppleMember(new Map(),joinner,memberList,role_))
})

