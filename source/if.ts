import * as msvcrt from './system/msvcrt.ts'

let valA:number = 10.0
let valB:number = 11.0

function main(){
    msvcrt.printf("ok ")

    if(valA==valB){
        msvcrt.printf("equal ")
    }else{
        msvcrt.printf("not equal ")
    }

    msvcrt.printf("end ")
}