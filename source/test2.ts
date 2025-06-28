import * as msvcrt from './system/msvcrt.ts'

let valA:number = 123

function funcA(propA:number){
    msvcrt.printf(" %i %i ", valA,propA)
}

//function main(){
    msvcrt.printf("start")

    funcA(11)

    msvcrt.printf("end")
//}